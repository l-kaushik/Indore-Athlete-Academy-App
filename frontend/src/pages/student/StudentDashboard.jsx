import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { MOCK_ASSIGNMENTS } from '../../data/mockData'
import StatCard from '../../components/ui/StatCard'
import Badge from '../../components/ui/Badge'
import { Dumbbell, Flame, CheckCircle2, ChevronRight, Zap, Target } from 'lucide-react'

// TODO: Replace mock with API call:
// const assignments = await api.get(`/assignments?student_id=${user.id}`)
const assignments = MOCK_ASSIGNMENTS

const MUSCLE_COLOR = {
  chest: 'bg-rose-500/10 text-rose-400',
  legs:  'bg-amber-500/10 text-amber-400',
  core:  'bg-cyan-500/10 text-cyan-400',
  shoulder: 'bg-violet-500/10 text-violet-400',
}

export default function StudentDashboard() {
  const { user } = useAuth()
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  const active    = assignments.find(a => a.status === 'in_progress')
  const completed = assignments.filter(a => a.status === 'completed').length
  const pending   = assignments.filter(a => a.status === 'assigned').length

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-zinc-500 text-sm">{greeting} 👋</p>
          <h1 className="text-3xl font-black text-white mt-0.5">
            {user?.first_name} {user?.last_name}
          </h1>
        </div>
        {active && (
          <Link to={`/student/workouts/${active.id}/log`}
            className="btn-primary px-4 py-2.5 text-sm flex items-center gap-2">
            <Zap className="w-3.5 h-3.5" />
            Continue Workout
          </Link>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Dumbbell}      label="Total Assigned"   value={assignments.length} accent="orange"  />
        <StatCard icon={CheckCircle2}  label="Completed"        value={completed}           accent="emerald" />
        <StatCard icon={Target}        label="In Progress"      value={active ? 1 : 0}      accent="blue"    />
        <StatCard icon={Flame}         label="Pending"          value={pending}             accent="violet"  />
      </div>

      {/* Active workout */}
      {active && (
        <section>
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-3">🔥 Active Workout</h2>
          <div className="card p-5 border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-transparent">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-black text-white">{active.template.name}</h3>
                <p className="text-zinc-400 text-sm mt-0.5">{active.template.description}</p>
              </div>
              <Badge value="in_progress" />
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              {active.exercises.map(ex => (
                <span key={ex.id} className={`text-xs px-2 py-1 rounded-lg font-medium ${MUSCLE_COLOR[ex.exercise.muscle_group] || 'bg-zinc-800 text-zinc-400'}`}>
                  {ex.exercise.name}
                </span>
              ))}
            </div>

            <Link to={`/student/workouts/${active.id}/log`}
              className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm">
              Log Progress <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      {/* All workouts quick view */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">My Workouts</h2>
          <Link to="/student/workouts" className="text-orange-400 hover:text-orange-300 text-xs font-semibold flex items-center gap-1">
            View all <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="space-y-2">
          {assignments.map(a => (
            <div key={a.id} className="card px-4 py-3.5 flex items-center gap-4 hover:border-zinc-700 transition-colors">
              <div className="w-9 h-9 bg-zinc-800 rounded-xl flex items-center justify-center shrink-0">
                <Dumbbell className="w-4 h-4 text-zinc-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm truncate">{a.template.name}</p>
                <p className="text-zinc-500 text-xs">{a.exercises.length} exercises · Assigned {a.assigned_at}</p>
              </div>
              <Badge value={a.status} />
              {a.status !== 'completed' && (
                <Link to={`/student/workouts/${a.id}/log`} className="btn-ghost p-2 rounded-xl">
                  <ChevronRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
