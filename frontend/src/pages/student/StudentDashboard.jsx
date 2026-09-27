import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { assignmentService } from '../../services/assignmentService'
import StatCard from '../../components/ui/StatCard'
import Badge from '../../components/ui/Badge'
import { Dumbbell, Flame, CheckCircle2, ChevronRight, Zap, Target, AlertCircle } from 'lucide-react'

const MUSCLE_COLOR = {
  CHEST: 'bg-rose-500/10 text-rose-400', LEGS: 'bg-amber-500/10 text-amber-400',
  CORE: 'bg-cyan-500/10 text-cyan-400',  SHOULDERS: 'bg-violet-500/10 text-violet-400',
  ARMS: 'bg-pink-500/10 text-pink-400',  BACK: 'bg-green-500/10 text-green-400',
  FULL_BODY: 'bg-orange-500/10 text-orange-400',
}

export default function StudentDashboard() {
  const { user } = useAuth()
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading]         = useState(true)
  const [error, setError]             = useState(null)

  useEffect(() => {
    if (!user?.id) return
    assignmentService.getByStudent(user.id, { size: 50 })
      .then(d => setAssignments(d.content ?? []))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [user?.id])

  const hour     = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
  const active    = assignments.find(a => a.status === 'IN_PROGRESS')
  const completed = assignments.filter(a => a.status === 'COMPLETED').length
  const pending   = assignments.filter(a => a.status === 'ASSIGNED').length

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-6 h-6 border-2 border-zinc-700 border-t-orange-500 rounded-full animate-spin" />
    </div>
  )

  if (error) return (
    <div className="card p-6 flex items-center gap-3 text-red-400 max-w-md">
      <AlertCircle className="w-5 h-5 shrink-0" />
      <p className="text-sm">{error}</p>
    </div>
  )

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-zinc-500 text-sm">{greeting} 👋</p>
          <h1 className="text-3xl font-black text-white mt-0.5">{user?.fullName}</h1>
        </div>
        {active && (
          <Link to={`/student/workouts/${active.id}/log`}
            className="btn-primary px-4 py-2.5 text-sm flex items-center gap-2">
            <Zap className="w-3.5 h-3.5" /> Continue Workout
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Dumbbell}     label="Total Assigned" value={assignments.length} accent="orange" />
        <StatCard icon={CheckCircle2} label="Completed"      value={completed}          accent="emerald" />
        <StatCard icon={Target}       label="In Progress"    value={active ? 1 : 0}     accent="blue" />
        <StatCard icon={Flame}        label="Pending"        value={pending}            accent="violet" />
      </div>

      {active && (
        <section>
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-3">🔥 Active Workout</h2>
          <div className="card p-5 border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-transparent">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs text-zinc-500 mb-1">Assignment #{active.id.slice(0,8)}…</p>
                <p className="text-zinc-400 text-sm">{active.exerciseCount} exercises assigned</p>
              </div>
              <Badge value={active.status} />
            </div>
            <Link to={`/student/workouts/${active.id}/log`}
              className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm">
              Log Progress <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">My Workouts</h2>
          <Link to="/student/workouts" className="text-orange-400 hover:text-orange-300 text-xs font-semibold flex items-center gap-1">
            View all <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        {assignments.length === 0 ? (
          <div className="card p-10 text-center">
            <Dumbbell className="w-8 h-8 text-zinc-700 mx-auto mb-2" />
            <p className="text-zinc-500 text-sm">No workouts assigned yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {assignments.slice(0, 5).map(a => (
              <div key={a.id} className="card px-4 py-3.5 flex items-center gap-4 hover:border-zinc-700 transition-colors">
                <div className="w-9 h-9 bg-zinc-800 rounded-xl flex items-center justify-center shrink-0">
                  <Dumbbell className="w-4 h-4 text-zinc-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm truncate">Assignment #{a.id.slice(0,8)}…</p>
                  <p className="text-zinc-500 text-xs">{a.exerciseCount} exercises · Assigned {new Date(a.assignedAt).toLocaleDateString()}</p>
                </div>
                <Badge value={a.status} />
                {a.status !== 'COMPLETED' && (
                  <Link to={`/student/workouts/${a.id}/log`} className="btn-ghost p-2 rounded-xl">
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
