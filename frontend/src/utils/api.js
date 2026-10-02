// ─── API Core ─────────────────────────────────────────────────────────────────
// Base URL: set VITE_API_URL in .env (default: http://localhost:8080/api/v1)
const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8080') + '/api/v1'

// ── Token storage ─────────────────────────────────────────────────────────────
export const tokenStore = {
  getAccess:    () => localStorage.getItem('accessToken'),
  setTokens:    (access, refresh) => {
    localStorage.setItem('accessToken', access)
  },
  clear:        () => {
    localStorage.removeItem('accessToken')
  },
}

// ── Token refresh ─────────────────────────────────────────────────────────────
let refreshPromise = null  // deduplicate concurrent refresh calls

async function doRefresh() {
  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: 'POST',
    credentials: 'include'
  })
  if (!res.ok) { tokenStore.clear(); throw new Error('Session expired') }
  const data = await res.json()
  tokenStore.setTokens(data.accessToken)
  return data.accessToken
}

async function refreshOnce() {
  if (!refreshPromise) {
    refreshPromise = doRefresh().finally(() => { refreshPromise = null })
  }
  return refreshPromise
}

// ── Raw fetch ─────────────────────────────────────────────────────────────────
async function rawFetch(method, path, body, overrideToken) {
  const token = overrideToken ?? tokenStore.getAccess()
  const headers = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  })

  // Parse body
  const text = await res.text()
  const data = text ? (() => { try { return JSON.parse(text) } catch { return text } })() : null

  if (!res.ok) {
    const err = new Error(data?.message || data?.error || res.statusText || String(res.status))
    err.status = res.status
    throw err
  }
  return data
}

// ── Public request (no auth) ──────────────────────────────────────────────────
async function publicRequest(method, path, body) {
  return rawFetch(method, path, body, null)
}

// ── Authenticated request (auto-refresh on 401) ───────────────────────────────
async function authRequest(method, path, body) {
  try {
    return await rawFetch(method, path, body)
  } catch (err) {
    if (err.status === 401) {
      try {
        const newToken = await refreshOnce()
        return rawFetch(method, path, body, newToken)
      } catch (refreshError){
        window.location.href = '/login'
        throw new Error('Session expired. Please log in again.')
      }
    }
    throw err
  }
}

// ── Exported API ──────────────────────────────────────────────────────────────
export const api = {
  // Authenticated
  get:    (path)       => authRequest('GET',    path, undefined),
  post:   (path, body) => authRequest('POST',   path, body),
  put:    (path, body) => authRequest('PUT',    path, body),
  patch:  (path, body) => authRequest('PATCH',  path, body),
  delete: (path)       => authRequest('DELETE', path, undefined),

  // Public (login, register, refresh)
  pub: {
    post: (path, body) => publicRequest('POST', path, body),
  },
}
