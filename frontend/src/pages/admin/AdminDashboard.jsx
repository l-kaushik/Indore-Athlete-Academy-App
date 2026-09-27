import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import StatCard from '../../components/ui/StatCard'
import { Users, Shield, Info } from 'lucide-react'

export default function AdminDashboard() {
  const { user } = useAuth()
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-zinc-500 text-sm">System Overview 🛡️</p>
          <h1 className="text-3xl font-black text-white mt-0.5">Admin Dashboard</h1>
        </div>
        <Link to="/admin/users" className="btn-primary px-4 py-2.5 text-sm flex items-center gap-2">
          <Users className="w-3.5 h-3.5" /> Manage Users
        </Link>
      </div>

      <div className="flex items-start gap-3 bg-amber-500/5 border border-amber-500/20 rounded-xl px-4 py-3">
        <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p className="text-amber-300/80 text-xs leading-relaxed">
          <span className="font-semibold">Backend gap:</span> A list endpoint for users (<code className="bg-amber-500/10 px-1 rounded">GET /api/v1/users</code>) is not in the API spec yet.
          User lookup by email/username and role updates (<code className="bg-amber-500/10 px-1 rounded">PUT /api/v1/users/{'{id}'}/role/{'{role}'}</code>) are fully wired.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <StatCard icon={Users}  label="Total Users"  value="—" sub="API pending" accent="orange" />
        <StatCard icon={Shield} label="Roles Active" value="3" sub="STUDENT · TRAINER · ADMIN" accent="violet" />
      </div>

      <div className="card p-6 hover:border-orange-500/30 transition-all">
        <h3 className="text-white font-bold mb-1">User Role Management</h3>
        <p className="text-zinc-500 text-sm mb-4">
          Look up any user by email or username, then update their role. Fully connected to <code className="bg-zinc-800 px-1 rounded text-xs">PUT /api/v1/users/{'{id}'}/role/{'{role}'}</code>.
        </p>
        <Link to="/admin/users" className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm">
          <Users className="w-4 h-4" /> Open User Management
        </Link>
      </div>
    </div>
  )
}
