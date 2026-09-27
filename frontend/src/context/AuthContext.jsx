import { createContext, useContext, useState, useEffect } from 'react'
import { authService }  from '../services/authService'
import { userService }  from '../services/userService'
import { tokenStore }   from '../utils/api'
import { decodeJwt, getPrimaryRole } from '../utils/jwt'

const AuthContext = createContext(null)

// Try to re-hydrate user from stored token on page reload
async function hydrateUser() {
  const token = tokenStore.getAccess()
  if (!token) return null
  try {
    const payload = decodeJwt(token)
    if (!payload?.sub) return null
    // sub is typically the email in Spring Security
    const user = await userService.getByEmail(payload.sub).catch(() =>
      userService.getByUsername(payload.sub).catch(() => null)
    )
    return user
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)   // initial hydration
  const [error, setError]     = useState(null)

  // Re-hydrate on mount
  useEffect(() => {
    hydrateUser().then(u => { setUser(u); setLoading(false) })
  }, [])

  const login = async (identifier, password) => {
    setError(null)
    try {
      // 1. Get tokens
      const tokens = await authService.login(identifier, password)
      tokenStore.setTokens(tokens.accessToken, tokens.refreshToken)

      // 2. Decode JWT to find the user's email/username
      const payload = decodeJwt(tokens.accessToken)
      const sub = payload?.sub

      // 3. Fetch full UserDto
      let profile = null
      if (sub) {
        // profile = await userService.getByEmail(sub).catch(() =>
        //   userService.getByUsername(sub).catch(() => null)
        // )
        profile = await userService.getById(sub).catch(() => null); 
      }
      setUser(profile)
      return { success: true, role: getPrimaryRole(profile?.roles) }
    } catch (err) {
      tokenStore.clear()
      const msg = err.message || 'Invalid credentials'
      setError(msg)
      return { success: false, error: msg }
    }
  }

  const register = async (formData) => {
    setError(null)
    try {
      await authService.register(formData)
      return { success: true }
    } catch (err) {
      const msg = err.message || 'Registration failed'
      setError(msg)
      return { success: false, error: msg }
    }
  }

  const logout = async () => {
    await authService.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, error, setError }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
