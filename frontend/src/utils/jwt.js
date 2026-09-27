// Decode a JWT payload (client-side only — no signature verification)
export function decodeJwt(token) {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(atob(base64))
  } catch {
    return null
  }
}

// Return the "primary" role from a roles array (ADMIN > TRAINER > STUDENT)
export function getPrimaryRole(roles = []) {
  if (roles.includes('ADMIN'))   return 'ADMIN'
  if (roles.includes('TRAINER')) return 'TRAINER'
  return 'STUDENT'
}

// Avatar initials from fullName
export function initials(fullName = '') {
  return fullName.trim().split(/\s+/).filter(Boolean).map(w => w[0].toUpperCase()).slice(0, 2).join('') || '?'
}

// Convert seconds (number) → ISO-8601 duration string e.g. "PT60S"
export function secondsToDuration(s) { return `PT${Number(s)}S` }

// Convert ISO-8601 "PT60S" / "PT1M30S" → seconds
export function durationToSeconds(d = '') {
  if (!d) return 0
  const m = d.match(/PT(?:(\d+)M)?(?:(\d+)S)?/)
  return (parseInt(m?.[1] || 0) * 60) + parseInt(m?.[2] || 0)
}
