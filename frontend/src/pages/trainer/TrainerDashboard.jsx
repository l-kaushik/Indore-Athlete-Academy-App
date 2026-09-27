import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import StatCard from '../../components/ui/StatCard'
import { Users, FileText, UserCheck, Plus, Info } from 'lucide-react'

// NOTE: The backend does not yet expose list endpoints for students or templates.
// These will be wired once GET /api/v1/users?role=STUDENT and GET /api/v1/workout-templates are available.

export default function TrainerDashboard() {
  const { user } = useAuth()

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-zinc-500 text-sm">Trainer Dashboard 💪</p>
          <h1 className="text-3xl font-black text-white mt-0.5">{user?.fullName}</h1>
        </div>
        <div className="flex gap-2">
          <Link to="/trainer/templates/create" className="btn-primary px-4 py-2.5 text-sm flex items-center gap-2">
            <Plus className="w-3.5 h-3.5" /> New Template
          </Link>
          <Link to="/trainer/assign" className="px-4 py-2.5 text-sm flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl transition-all font-semibold">
            <UserCheck className="w-3.5 h-3.5" /> Assign Workout
          </Link>
        </div>
      </div>

      {/* API gap notice */}
      <div className="flex items-start gap-3 bg-amber-500/5 border border-amber-500/20 rounded-xl px-4 py-3">
        <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p className="text-amber-300/80 text-xs leading-relaxed">
          <span className="font-semibold">Backend gap:</span> List endpoints for students and templates are not yet available in the API.
          Creating templates and assigning workouts are fully functional.
          Stats below will populate once <code className="bg-amber-500/10 px-1 rounded">GET /api/v1/users?role=STUDENT</code> and <code className="bg-amber-500/10 px-1 rounded">GET /api/v1/workout-templates</code> are added.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard icon={Users}     label="Students"   value="—" sub="API pending" accent="orange" />
        <StatCard icon={FileText}  label="Templates"  value="—" sub="API pending" accent="blue" />
        <StatCard icon={UserCheck} label="Assignments" value="—" sub="API pending" accent="emerald" />
      </div>

      {/* Quick action cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/trainer/templates/create"
          className="card p-6 hover:border-orange-500/30 transition-all group">
          <div className="w-10 h-10 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center justify-center mb-4">
            <FileText className="w-5 h-5 text-orange-400" />
          </div>
          <h3 className="text-white font-bold mb-1 group-hover:text-orange-400 transition-colors">Create Template</h3>
          <p className="text-zinc-500 text-sm">Build a reusable workout plan from the exercise library and save it for future assignments.</p>
        </Link>

        <Link to="/trainer/assign"
          className="card p-6 hover:border-blue-500/30 transition-all group">
          <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center mb-4">
            <UserCheck className="w-5 h-5 text-blue-400" />
          </div>
          <h3 className="text-white font-bold mb-1 group-hover:text-blue-400 transition-colors">Assign Workout</h3>
          <p className="text-zinc-500 text-sm">Find a student by username, pick a template, set per-exercise targets, and assign instantly.</p>
        </Link>
      </div>
    </div>
  )
}
