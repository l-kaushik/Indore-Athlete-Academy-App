import { createContext, useContext, useState } from 'react'
import { MOCK_USERS } from '../data/mockData'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const login = async (email, password) => {
    setLoading(true)
    setError(null)

    // TODO: Replace with real API call ↓
    // const res = await api.post('/auth/login', { email, password })
    // const { user, token } = res
    // localStorage.setItem('token', token)
    // setUser(user)
    await new Promise(r => setTimeout(r, 700)) // simulate network latency

    const found = MOCK_USERS.find(u => u.emailId === email)
    if (found && password === 'password123') {
      setUser(found)
      setLoading(false)
      return { success: true, role: found.role }
    }

    setError('Invalid email or password')
    setLoading(false)
    return { success: false }
  }

  const register = async (formData) => {
    setLoading(true)
    setError(null)

    // TODO: Replace with real API call ↓
    // const res = await api.post('/auth/register', formData)
    await new Promise(r => setTimeout(r, 800))

    setLoading(false)
    return { success: true }
  }

  const logout = () => {
    // TODO: also call api.post('/auth/logout') and clear localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, error, setError }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
