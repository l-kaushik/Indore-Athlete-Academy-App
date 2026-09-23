import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Zap, Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function Register() {
  const { register, loading } = useAuth()
  const navigate = useNavigate()
  const [done, setDone] = useState(false)
  const [showPw, setShowPw] = useState(false)
  const [form, setForm] = useState({
    first_name: '', last_name: '', username: '',
    emailId: '', date_of_birth: '', password: '', confirm: '',
  })
  const [err, setErr] = useState('')

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (form.password !== form.confirm) { setErr('Passwords do not match'); return }
    if (form.password.length < 8)       { setErr('Password must be at least 8 characters'); return }
    setErr('')
    // TODO: api.post('/auth/register', { ...form, role: 'STUDENT' })
    const { success } = await register(form)
    if (success) setDone(true)
  }

  if (done) return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center p-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-emerald-500/15 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
        </div>
        <h2 className="text-2xl font-black text-white mb-2">Account Created!</h2>
        <p className="text-zinc-400 text-sm mb-6">Your account is pending role assignment by a trainer or admin.</p>
        <button onClick={() => navigate('/login')}
          className="btn-primary px-6 py-2.5 text-sm flex items-center gap-2 mx-auto">
          Go to Login <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" fill="white" />
          </div>
          <span className="font-bold text-white">Indore Athlete Academy</span>
        </div>

        <h2 className="text-3xl font-black text-white mb-1">Create account</h2>
        <p className="text-zinc-500 text-sm mb-8">Join the academy. Role will be assigned by your trainer.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">First Name</label>
              <input value={form.first_name} onChange={set('first_name')} placeholder="Rahul" required className="input-base" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">Last Name</label>
              <input value={form.last_name} onChange={set('last_name')} placeholder="Sharma" required className="input-base" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">Username</label>
            <input value={form.username} onChange={set('username')} placeholder="rahul_s" required className="input-base" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">Email</label>
            <input type="email" value={form.emailId} onChange={set('emailId')} placeholder="rahul@example.com" required className="input-base" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">Date of Birth</label>
            <input type="date" value={form.date_of_birth} onChange={set('date_of_birth')} required
              className="input-base [color-scheme:dark]" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">Password</label>
            <div className="relative">
              <input type={showPw ? 'text' : 'password'} value={form.password} onChange={set('password')}
                placeholder="Min. 8 characters" required className="input-base pr-11" />
              <button type="button" onClick={() => setShowPw(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">Confirm Password</label>
            <input type="password" value={form.confirm} onChange={set('confirm')} placeholder="Re-enter password" required className="input-base" />
          </div>

          {err && (
            <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2.5">{err}</p>
          )}

          <button type="submit" disabled={loading}
            className="btn-primary w-full py-3 flex items-center justify-center gap-2 text-sm mt-1">
            {loading
              ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              : <><span>Create Account</span><ArrowRight className="w-4 h-4" /></>
            }
          </button>
        </form>

        <p className="text-center text-zinc-600 text-xs mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-orange-400 hover:text-orange-300 font-semibold">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
