import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { MOCK_STUDENTS, MOCK_TEMPLATES, MOCK_ASSIGNMENTS } from '../../data/mockData'
import StatCard from '../../components/ui/StatCard'
import Badge from '../../components/ui/Badge'
import { Users, FileText, UserCheck, CheckCircle2, ChevronRight, Plus } from 'lucide-react'

// TODO: Replace with real API calls
const students    = MOCK_STUDENTS
const templates   = MOCK_TEMPLATES
const assignments = MOCK_ASSIGNMENTS

export default function TrainerDashboard() {
  const { user } = useAuth()
  const active    = assignments.filter(a => a.status === 'in_progress').length
  const completed = assignments.filter(a => a.status === 'completed').length

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-zinc-500 text-sm">Trainer Dashboard 💪</p>
          <h1 className="text-3xl font-black text-white mt-0.5">{user?.first_name} {user?.last_name}</h1>
        </div>
        <div className="flex gap-2">
          <Link to="/trainer/templates/create"
            className="btn-primary px-4 py-2.5 text-sm flex items-center gap-2">
            <Plus className="w-3.5 h-3.5" /> New Template
          </Link>
          <Link to="/trainer/assign"
            className="px-4 py-2.5 text-sm flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl transition-all font-semibold">
            <UserCheck className="w-3.5 h-3.5" /> Assign Workout
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Users}         label="My Students"       value={students.length}    accent="orange"  />
        <StatCard icon={FileText}      label="Templates"         value={templates.length}   accent="blue"    />
        <StatCard icon={UserCheck}     label="Active Workouts"   value={active}             accent="violet"  />
        <StatCard icon={CheckCircle2}  label="Completed"         value={completed}          accent="emerald" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Students */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">My Students</h2>
          </div>
          <div className="space-y-2">
            {students.map(s => (
              <div key={s.id} className="card px-4 py-3 flex items-center gap-3 hover:border-zinc-700 transition-colors">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500/30 to-blue-600/10 border border-blue-500/20 rounded-lg flex items-center justify-center text-xs font-bold text-blue-400 shrink-0">
                  {s.first_name[0]}{s.last_name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold truncate">{s.first_name} {s.last_name}</p>
                  <p className="text-zinc-500 text-xs">{s.workoutsCompleted} completed · {s.activeAssignments} active</p>
                </div>
                <div className="shrink-0">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(s.workoutsCompleted, 5) }).map((_, i) => (
                      <div key={i} className="w-1.5 h-4 bg-orange-500/40 rounded-sm" style={{ height: `${10 + i * 3}px` }} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent assignments */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">Recent Assignments</h2>
            <Link to="/trainer/assign" className="text-orange-400 hover:text-orange-300 text-xs font-semibold flex items-center gap-1">
              Assign <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="space-y-2">
            {assignments.map(a => (
              <div key={a.id} className="card px-4 py-3 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold truncate">{a.template.name}</p>
                  <p className="text-zinc-500 text-xs">Student #{a.student_id} · {a.assigned_at}</p>
                </div>
                <Badge value={a.status} />
              </div>
            ))}
          </div>

          {/* Quick links */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Link to="/trainer/templates"
              className="card px-3 py-3 flex items-center gap-2 hover:border-zinc-700 transition-colors group">
              <FileText className="w-4 h-4 text-orange-400" />
              <span className="text-white text-xs font-semibold group-hover:text-orange-400 transition-colors">Templates</span>
            </Link>
            <Link to="/trainer/assign"
              className="card px-3 py-3 flex items-center gap-2 hover:border-zinc-700 transition-colors group">
              <UserCheck className="w-4 h-4 text-blue-400" />
              <span className="text-white text-xs font-semibold group-hover:text-blue-400 transition-colors">Assign</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
