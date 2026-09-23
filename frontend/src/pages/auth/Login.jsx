import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Zap, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react'

const DEMO = [
  { label: 'Student', email: 'student@iaa.com', color: 'blue' },
  { label: 'Trainer', email: 'trainer@iaa.com', color: 'orange' },
  { label: 'Admin',   email: 'admin@iaa.com',   color: 'purple' },
]

export default function Login() {
  const { login, loading, error } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]     = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    const { success, role } = await login(email, password)
    if (success) {
      if (role === 'STUDENT') navigate('/student/dashboard')
      else if (role === 'TRAINER') navigate('/trainer/dashboard')
      else navigate('/admin/dashboard')
    }
  }

  const fillDemo = (demoEmail) => {
    setEmail(demoEmail)
    setPassword('password123')
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex">
      {/* Left panel */}
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

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-[360px]">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" fill="white" />
            </div>
            <span className="font-bold text-white">Indore Athlete Academy</span>
          </div>

          <h2 className="text-3xl font-black text-white mb-1">Welcome back</h2>
          <p className="text-zinc-500 text-sm mb-8">Sign in to continue your journey</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">Email</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@iaa.com" required
                className="input-base"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" required
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

          {/* Demo accounts */}
          <div className="mt-8 pt-6 border-t border-zinc-800/60">
            <p className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest text-center mb-3">
              Demo accounts (pw: password123)
            </p>
            <div className="grid grid-cols-3 gap-2">
              {DEMO.map(({ label, email: de, color }) => (
                <button key={label} onClick={() => fillDemo(de)}
                  className={`text-xs py-2 rounded-xl border font-semibold transition-all ${
                    color === 'blue'   ? 'border-blue-500/30   text-blue-400   hover:bg-blue-500/10'   :
                    color === 'orange' ? 'border-orange-500/30 text-orange-400 hover:bg-orange-500/10' :
                                        'border-purple-500/30 text-purple-400 hover:bg-purple-500/10'
                  }`}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-zinc-600 text-xs mt-6">
            New here?{' '}
            <Link to="/register" className="text-orange-400 hover:text-orange-300 font-semibold">Create account</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
