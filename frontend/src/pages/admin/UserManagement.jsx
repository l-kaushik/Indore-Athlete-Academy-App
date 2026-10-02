import { useState } from 'react'
import { userService } from '../../services/userService'
import Badge from '../../components/ui/Badge'
import { Search, Check, X, Pencil, AlertCircle, ChevronDown, Info } from 'lucide-react'

const ROLES = ['STUDENT','TRAINER','ADMIN']

export default function UserManagement() {
  const [query,     setQuery]     = useState('')
  const [searchBy,  setSearchBy]  = useState('email')   // 'email' | 'username'
  const [loading,   setLoading]   = useState(false)
  const [foundUser, setFoundUser] = useState(null)
  const [searchErr, setSearchErr] = useState('')

  const [editing,  setEditing]  = useState(null)  // { userId, role }
  const [saving,   setSaving]   = useState(false)
  const [saveMsg,  setSaveMsg]  = useState('')

  const handleSearch = async () => {
    if (!query.trim()) return
    setLoading(true); setSearchErr(''); setFoundUser(null); setSaveMsg('')
    try {
      const user = searchBy === 'email'
        ? await userService.getByEmail(query.trim())
        : await userService.getByUsername(query.trim())
      setFoundUser(user)
    } catch {
      setSearchErr(`No user found with that ${searchBy}`)
    } finally { setLoading(false) }
  }

  const saveRole = async () => {
    if (!editing) return
    setSaving(true); setSaveMsg('')
    try {
      const updated = await userService.updateRole(editing.userId, editing.role)
      setFoundUser(updated)
      setSaveMsg('Role updated successfully!')
      setEditing(null)
    } catch (e) {
      setSaveMsg(`Error: ${e.message}`)
    } finally { setSaving(false) }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-black text-white">User Management</h1>
        <p className="text-zinc-500 text-sm mt-1">Look up users and update their roles</p>
      </div>

      <div className="flex items-start gap-3 bg-amber-500/5 border border-amber-500/20 rounded-xl px-4 py-3">
        <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p className="text-amber-300/80 text-xs">
          The API provides user lookup by email or username. A bulk user list endpoint is not available yet — search for individual users below.
        </p>
      </div>

      {/* Search bar */}
      <div className="card p-5 space-y-3">
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">Find User</h2>
        <div className="flex gap-2">
          <select value={searchBy} onChange={e => setSearchBy(e.target.value)} className="input-base w-36 text-xs flex-1">
            <option value="email">By Email</option>
            <option value="username">By Username</option>
          </select>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
            <input value={query}
              onChange={e => { setQuery(e.target.value); setSearchErr('') }}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              placeholder={searchBy === 'email' ? 'user@example.com' : 'username'}
              className="input-base !pl-8" />
          </div>
          <button onClick={handleSearch} disabled={loading || !query.trim()}
            className="btn-primary px-4 py-2.5 text-sm flex items-center gap-2">
            {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Search'}
          </button>
        </div>
        {searchErr && (
          <p className="text-red-400 text-xs flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5" />{searchErr}
          </p>
        )}
      </div>

      {/* Result card */}
      {foundUser && (
        <div className="card p-5 space-y-4">
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">User Found</h2>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0">
              {foundUser.fullName?.split(' ').map(w=>w[0]).join('').slice(0,2)}
            </div>
            <div>
              <p className="text-white font-bold text-lg">{foundUser.fullName}</p>
              <p className="text-zinc-400 text-sm">{foundUser.email}</p>
              <p className="text-zinc-500 text-xs">@{foundUser.username} · ID: {foundUser.id?.slice(0,8)}…</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            {[
              ['Joined',   foundUser.createdAt ? new Date(foundUser.createdAt).toLocaleDateString() : '—'],
              ['Provider', foundUser.provider || 'LOCAL'],
              ['DOB',      foundUser.dob || '—'],
              ['City',     foundUser.address?.city || '—'],
            ].map(([l, v]) => (
              <div key={l} className="bg-zinc-900/60 border border-zinc-800 rounded-xl px-3 py-2.5">
                <p className="text-zinc-500 mb-0.5">{l}</p>
                <p className="text-white font-medium">{v}</p>
              </div>
            ))}
          </div>

          {/* Current roles */}
          <div>
            <p className="text-xs text-zinc-500 mb-2">Current roles</p>
            <div className="flex gap-2 flex-wrap">
              {(foundUser.roles ?? []).map(r => <Badge key={r} value={r} />)}
            </div>
          </div>

          {/* Role editor */}
          <div className="border-t border-zinc-800/60 pt-4">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-2">Update Role</p>
            {editing?.userId === foundUser.id ? (
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <select value={editing.role} onChange={e => setEditing({ ...editing, role: e.target.value })}
                    className="input-base pr-7 text-sm appearance-none cursor-pointer">
                    {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-500 pointer-events-none" />
                </div>
                <button onClick={saveRole} disabled={saving}
                  className="p-2 text-emerald-400 hover:bg-emerald-500/10 rounded-xl transition-colors border border-emerald-500/20">
                  {saving ? <div className="w-4 h-4 border border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" /> : <Check className="w-4 h-4" />}
                </button>
                <button onClick={() => setEditing(null)}
                  className="p-2 text-zinc-500 hover:bg-zinc-800 rounded-xl transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button onClick={() => setEditing({ userId: foundUser.id, role: foundUser.roles?.[0] || 'STUDENT' })}
                className="inline-flex items-center gap-2 text-xs px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-semibold transition-all">
                <Pencil className="w-3.5 h-3.5" /> Change Role
              </button>
            )}
            {saveMsg && (
              <p className={`text-xs mt-2 ${saveMsg.startsWith('Error') ? 'text-red-400' : 'text-emerald-400'}`}>{saveMsg}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
