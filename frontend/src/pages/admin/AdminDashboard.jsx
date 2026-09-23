import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { ALL_USERS, MOCK_TEMPLATES, MOCK_ASSIGNMENTS } from '../../data/mockData'
import StatCard from '../../components/ui/StatCard'
import Badge from '../../components/ui/Badge'
import { Users, UserCheck, Shield, FileText, ChevronRight, TrendingUp } from 'lucide-react'

// TODO: Replace with API calls
const users       = ALL_USERS
const templates   = MOCK_TEMPLATES
const assignments = MOCK_ASSIGNMENTS

export default function AdminDashboard() {
  const { user } = useAuth()
  const students  = users.filter(u => u.role === 'STUDENT')
  const trainers  = users.filter(u => u.role === 'TRAINER')
  const admins    = users.filter(u => u.role === 'ADMIN')

  const completed = assignments.filter(a => a.status === 'completed').length

  const recentUsers = [...users].sort((a, b) => new Date(b.joinedAt) - new Date(a.joinedAt)).slice(0, 6)

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-zinc-500 text-sm">System Overview 🛡️</p>
          <h1 className="text-3xl font-black text-white mt-0.5">Admin Dashboard</h1>
        </div>
        <Link to="/admin/users"
          className="btn-primary px-4 py-2.5 text-sm flex items-center gap-2">
          <Users className="w-3.5 h-3.5" /> Manage Users
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Users}      label="Total Users"   value={users.length}      accent="orange"  />
        <StatCard icon={UserCheck}  label="Students"      value={students.length}   accent="blue"    />
        <StatCard icon={TrendingUp} label="Trainers"      value={trainers.length}   accent="emerald" />
        <StatCard icon={Shield}     label="Admins"        value={admins.length}     accent="violet"  />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User distribution */}
        <div className="card p-5 md:col-span-1">
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-5">User Breakdown</h2>
          <div className="space-y-4">
            {[
              { label: 'Students', count: students.length, pct: Math.round(students.length / users.length * 100), color: 'bg-blue-500' },
              { label: 'Trainers', count: trainers.length, pct: Math.round(trainers.length / users.length * 100), color: 'bg-orange-500' },
              { label: 'Admins',   count: admins.length,   pct: Math.round(admins.length   / users.length * 100), color: 'bg-purple-500' },
            ].map(({ label, count, pct, color }) => (
              <div key={label}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-zinc-300 font-medium">{label}</span>
                  <span className="text-zinc-500">{count} · {pct}%</span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-5 border-t border-zinc-800/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-zinc-500 text-xs">Templates created</span>
              <span className="text-white font-bold text-sm">{templates.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-500 text-xs">Workouts assigned</span>
              <span className="text-white font-bold text-sm">{assignments.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-500 text-xs">Workouts completed</span>
              <span className="text-emerald-400 font-bold text-sm">{completed}</span>
            </div>
          </div>
        </div>

        {/* Recent users */}
        <div className="card p-5 md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">Recent Users</h2>
            <Link to="/admin/users" className="text-orange-400 hover:text-orange-300 text-xs font-semibold flex items-center gap-1">
              All users <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="space-y-2">
            {recentUsers.map(u => (
              <div key={u.id} className="flex items-center gap-3 py-2 border-b border-zinc-800/40 last:border-0">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                  u.role === 'STUDENT' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                  u.role === 'TRAINER' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                  'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                }`}>
                  {u.first_name[0]}{u.last_name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold truncate">{u.first_name} {u.last_name}</p>
                  <p className="text-zinc-500 text-xs">{u.emailId}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge value={u.role} />
                  <span className="text-zinc-600 text-xs hidden sm:block">{u.joinedAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
