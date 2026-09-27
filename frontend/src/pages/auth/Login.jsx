import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { getPrimaryRole } from '../../utils/jwt'
import { Zap, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react'

export default function Login() {
  const { login, error, setError } = useAuth()
  const navigate = useNavigate()
  const [identifier, setIdentifier] = useState('')   // email or username
  const [password, setPassword]     = useState('')
  const [showPw, setShowPw]         = useState(false)
  const [loading, setLoading]       = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    const { success, role } = await login(identifier, password)
    setLoading(false)
    if (success) {
      if (role === 'ADMIN')   navigate('/admin/dashboard')
      else if (role === 'TRAINER') navigate('/trainer/dashboard')
      else navigate('/student/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex">
      {/* Left branding panel */}
      <div className="hidden lg:flex flex-col justify-between w-[46%] p-12 border-r border-zinc-800/40 bg-gradient-to-br from-orange-950/30 via-[#0D0D0D] to-[#0D0D0D]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
            <Zap className="w-5 h-5 text-white" fill="white" />
          </div>
          <span className="font-bold text-white text-lg">Indore Athlete Academy</span>
        </div>
        <div>
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-3 py-1 mb-6">
            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-orange-400 text-xs font-medium">Platform v1.0 — Now Live</span>
          </div>
          <h1 className="text-5xl font-black text-white leading-[1.1] mb-4">
            Train Hard.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              Track Smart.
            </span>
          </h1>
          <p className="text-zinc-400 text-base leading-relaxed max-w-sm">
            Complete fitness management for students, trainers, and administrators — all in one place.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[['150+', 'Students'], ['20+', 'Trainers'], ['500+', 'Workouts']].map(([n, l]) => (
            <div key={l} className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4">
              <p className="text-2xl font-black text-orange-400">{n}</p>
              <p className="text-xs text-zinc-400 mt-0.5">{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-[360px]">
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" fill="white" />
            </div>
            <span className="font-bold text-white">Indore Athlete Academy</span>
          </div>

          <h2 className="text-3xl font-black text-white mb-1">Welcome back</h2>
          <p className="text-zinc-500 text-sm mb-8">Sign in with your email or username</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">
                Email or Username
              </label>
              <input
                type="text"
                value={identifier}
                onChange={e => { setIdentifier(e.target.value); setError(null) }}
                placeholder="you@example.com or your_username"
                required
                className="input-base"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(null) }}
                  placeholder="••••••••"
                  required
                  className="input-base pr-11"
                />
                <button type="button" onClick={() => setShowPw(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {error}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="btn-primary w-full py-3 flex items-center justify-center gap-2 text-sm mt-1">
              {loading
                ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <><span>Sign In</span><ArrowRight className="w-4 h-4" /></>
              }
            </button>
          </form>

          <p className="text-center text-zinc-600 text-xs mt-8">
            New here?{' '}
            <Link to="/register" className="text-orange-400 hover:text-orange-300 font-semibold">Create account</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
