import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Zap, Eye, EyeOff, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react'

// Password rule from API spec: ^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&._-])...
const PW_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&._\-])[A-Za-z\d@$!%*#?&._\-]{8,100}$/
// Username rule: ^[A-Za-z0-9_]{6,25}$
const UN_REGEX = /^[A-Za-z0-9_]{6,25}$/

export default function Register() {
  const { register, error: authError, setError } = useAuth()
  const navigate = useNavigate()
  const [done, setDone]       = useState(false)
  const [showPw, setShowPw]   = useState(false)
  const [loading, setLoading] = useState(false)
  const [localError, setLocalError] = useState('')

  const [form, setForm] = useState({
    fullName: '', username: '', email: '',
    password: '', confirm: '', dob: '',
    // address fields (optional)
    street: '', city: '', state: '', pincode: '',
  })

  const set = k => e => { setForm(f => ({ ...f, [k]: e.target.value })); setLocalError(''); setError(null) }

  const handleSubmit = async e => {
    e.preventDefault()
    setLocalError('')

    if (!UN_REGEX.test(form.username)) {
      setLocalError('Username must be 6–25 characters: letters, numbers, underscores only')
      return
    }
    if (!PW_REGEX.test(form.password)) {
      setLocalError('Password needs letters, a number, and a special character (@$!%*#?&._-), min 8 chars')
      return
    }
    if (form.password !== form.confirm) {
      setLocalError('Passwords do not match')
      return
    }

    // Build request body matching UserRegisterDto
    const body = {
      email:    form.email,
      username: form.username,
      password: form.password,
      fullName: form.fullName,
      dob:      form.dob || undefined,
    }
    // Include address only if at least one field is filled
    if (form.city || form.street || form.state || form.pincode) {
      body.address = {
        street:  form.street  || undefined,
        city:    form.city    || undefined,
        state:   form.state   || undefined,
        pincode: form.pincode || undefined,
      }
    }

    setLoading(true)
    const { success } = await register(body)
    setLoading(false)
    if (success) setDone(true)
  }

  const displayError = localError || authError

  if (done) return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center p-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-emerald-500/15 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
        </div>
        <h2 className="text-2xl font-black text-white mb-2">Account Created!</h2>
        <p className="text-zinc-400 text-sm mb-6">Your account is pending role assignment by an admin or trainer.</p>
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
        <p className="text-zinc-500 text-sm mb-8">Join the academy. A trainer or admin will assign your role.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full name + username */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">Full Name *</label>
              <input value={form.fullName} onChange={set('fullName')} placeholder="Rahul Sharma" required className="input-base" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">Username *</label>
              <input value={form.username} onChange={set('username')} placeholder="rahul_s" required className="input-base" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">Email *</label>
            <input type="email" value={form.email} onChange={set('email')} placeholder="rahul@example.com" required className="input-base" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">Date of Birth</label>
            <input type="date" value={form.dob} onChange={set('dob')} className="input-base [color-scheme:dark]" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">Password *</label>
            <div className="relative">
              <input type={showPw ? 'text' : 'password'} value={form.password} onChange={set('password')}
                placeholder="Min 8 chars, letter + number + symbol" required className="input-base pr-11" />
              <button type="button" onClick={() => setShowPw(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-zinc-600 text-[10px] mt-1">Must contain a letter, number, and one of: @$!%*#?&._-</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">Confirm Password *</label>
            <input type="password" value={form.confirm} onChange={set('confirm')} placeholder="Re-enter password" required className="input-base" />
          </div>

          {/* Optional address */}
          <details className="group">
            <summary className="text-xs font-semibold text-zinc-500 cursor-pointer hover:text-zinc-300 transition-colors select-none list-none flex items-center gap-1.5">
              <span className="w-4 h-4 rounded border border-zinc-700 flex items-center justify-center text-[8px] group-open:bg-zinc-800">▼</span>
              Address (optional)
            </summary>
            <div className="mt-3 space-y-3 pl-1">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">City</label>
                  <input value={form.city} onChange={set('city')} placeholder="Indore" className="input-base" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">State</label>
                  <input value={form.state} onChange={set('state')} placeholder="MP" className="input-base" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">Street</label>
                <input value={form.street} onChange={set('street')} placeholder="123, MG Road" className="input-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">Pincode</label>
                <input value={form.pincode} onChange={set('pincode')} placeholder="452001" className="input-base" />
              </div>
            </div>
          </details>

          {displayError && (
            <div className="flex items-start gap-2 text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              {displayError}
            </div>
          )}

          <button type="submit" disabled={loading}
            className="btn-primary w-full py-3 flex items-center justify-center gap-2 text-sm">
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
