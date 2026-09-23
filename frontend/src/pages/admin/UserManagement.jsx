import { useState } from 'react'
import { ALL_USERS } from '../../data/mockData'
import Badge from '../../components/ui/Badge'
import { Search, X, Check, Pencil, Users, ChevronDown } from 'lucide-react'

// TODO: const users = await api.get('/users')
const ROLES = ['STUDENT', 'TRAINER', 'ADMIN']

export default function UserManagement() {
  const [users, setUsers]       = useState(ALL_USERS)
  const [search, setSearch]     = useState('')
  const [roleFilter, setFilter] = useState('ALL')
  const [editing, setEditing]   = useState(null)  // { userId, role }
  const [saving, setSaving]     = useState(false)

  const filtered = users.filter(u => {
    const matchSearch = `${u.first_name} ${u.last_name} ${u.emailId} ${u.username}`
      .toLowerCase().includes(search.toLowerCase())
    const matchRole = roleFilter === 'ALL' || u.role === roleFilter
    return matchSearch && matchRole
  })

  const saveRole = async () => {
    if (!editing) return
    setSaving(true)
    // TODO: await api.patch(`/users/${editing.userId}/role`, { role: editing.role })
    await new Promise(r => setTimeout(r, 500))
    setUsers(us => us.map(u => u.id === editing.userId ? { ...u, role: editing.role } : u))
    setSaving(false)
    setEditing(null)
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-3xl font-black text-white">User Management</h1>
        <p className="text-zinc-500 text-sm mt-1">{users.length} users registered · Assign and manage roles</p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search users..." className="input-base pl-9" />
        </div>
        <div className="flex gap-1.5 bg-zinc-900/60 border border-zinc-800 rounded-xl p-1">
          {['ALL', ...ROLES].map(r => (
            <button key={r} onClick={() => setFilter(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                roleFilter === r
                  ? 'bg-orange-500 text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}>
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800/60">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-zinc-500 uppercase tracking-widest">User</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-zinc-500 uppercase tracking-widest hidden md:table-cell">Username</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-zinc-500 uppercase tracking-widest">Role</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-zinc-500 uppercase tracking-widest hidden lg:table-cell">Joined</th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-zinc-500 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-zinc-600">
                    <Users className="w-8 h-8 mx-auto mb-2 text-zinc-700" />
                    No users found
                  </td>
                </tr>
              ) : filtered.map(u => (
                <tr key={u.id} className="border-b border-zinc-800/40 last:border-0 hover:bg-zinc-800/20 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                        u.role === 'STUDENT' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                        u.role === 'TRAINER' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                        'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                      }`}>
                        {u.first_name[0]}{u.last_name[0]}
                      </div>
                      <div className="min-w-0">
                        <p className="text-white font-semibold truncate">{u.first_name} {u.last_name}</p>
                        <p className="text-zinc-500 text-xs truncate">{u.emailId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-zinc-400 hidden md:table-cell">@{u.username}</td>
                  <td className="px-5 py-3.5">
                    {editing?.userId === u.id ? (
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <select value={editing.role} onChange={e => setEditing({ ...editing, role: e.target.value })}
                            className="input-base py-1 pr-7 text-xs appearance-none cursor-pointer">
                            {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                          </select>
                          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-500 pointer-events-none" />
                        </div>
                        <button onClick={saveRole} disabled={saving}
                          className="p-1.5 text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors">
                          {saving ? <div className="w-3.5 h-3.5 border border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                        </button>
                        <button onClick={() => setEditing(null)}
                          className="p-1.5 text-zinc-500 hover:bg-zinc-800 rounded-lg transition-colors">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <Badge value={u.role} />
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-zinc-500 text-xs hidden lg:table-cell">{u.joinedAt}</td>
                  <td className="px-5 py-3.5 text-right">
                    {editing?.userId !== u.id && (
                      <button onClick={() => setEditing({ userId: u.id, role: u.role })}
                        className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all font-medium">
                        <Pencil className="w-3 h-3" /> Edit Role
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length > 0 && (
          <div className="px-5 py-3 border-t border-zinc-800/60 flex items-center justify-between">
            <p className="text-zinc-600 text-xs">Showing {filtered.length} of {users.length} users</p>
          </div>
        )}
      </div>
    </div>
  )
}
