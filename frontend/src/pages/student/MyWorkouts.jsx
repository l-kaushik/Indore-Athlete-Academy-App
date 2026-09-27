import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { assignmentService } from '../../services/assignmentService'
import Badge from '../../components/ui/Badge'
import { Dumbbell, ChevronRight, Calendar, AlertCircle } from 'lucide-react'

const TABS = [
  { key: 'ALL',         label: 'All' },
  { key: 'ASSIGNED',    label: 'Assigned' },
  { key: 'IN_PROGRESS', label: 'In Progress' },
  { key: 'COMPLETED',   label: 'Completed' },
]

export default function MyWorkouts() {
  const { user } = useAuth()
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading]         = useState(true)
  const [error, setError]             = useState(null)
  const [tab, setTab]                 = useState('ALL')

  useEffect(() => {
    if (!user?.id) return
    assignmentService.getByStudent(user.id, { size: 50 })
      .then(d => setAssignments(d.content ?? []))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [user?.id])

  const filtered = tab === 'ALL' ? assignments : assignments.filter(a => a.status === tab)
  const countFor = key => key === 'ALL' ? assignments.length : assignments.filter(a => a.status === key).length

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-6 h-6 border-2 border-zinc-700 border-t-orange-500 rounded-full animate-spin" />
    </div>
  )

  if (error) return (
    <div className="card p-6 flex items-center gap-3 text-red-400 max-w-md">
      <AlertCircle className="w-5 h-5 shrink-0" /><p className="text-sm">{error}</p>
    </div>
  )

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-black text-white">My Workouts</h1>
        <p className="text-zinc-500 text-sm mt-1">All your assigned workout plans</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1.5 bg-zinc-900/60 border border-zinc-800 rounded-xl p-1 w-fit">
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              tab === t.key ? 'bg-orange-500 text-white' : 'text-zinc-400 hover:text-white'
            }`}>
            {t.label}
            <span className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded-md ${tab === t.key ? 'bg-white/20 text-white' : 'bg-zinc-800 text-zinc-500'}`}>
              {countFor(t.key)}
            </span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="card p-12 text-center">
          <Dumbbell className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
          <p className="text-zinc-400 font-medium">No workouts here</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map(a => (
            <div key={a.id} className="card p-5 hover:border-zinc-700 transition-all group">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    a.status === 'COMPLETED'   ? 'bg-emerald-500/15' :
                    a.status === 'IN_PROGRESS' ? 'bg-blue-500/15' : 'bg-zinc-800'
                  }`}>
                    <Dumbbell className={`w-4 h-4 ${
                      a.status === 'COMPLETED'   ? 'text-emerald-400' :
                      a.status === 'IN_PROGRESS' ? 'text-blue-400' : 'text-zinc-500'
                    }`} />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-xs font-mono">#{a.id.slice(0,8)}…</p>
                    <p className="text-zinc-400 text-sm mt-0.5">{a.exerciseCount} exercises</p>
                  </div>
                </div>
                <Badge value={a.status} />
              </div>
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Assigned {new Date(a.assignedAt).toLocaleDateString()}
                </span>
                {a.status !== 'COMPLETED' && (
                  <Link to={`/student/workouts/${a.id}/log`}
                    className="btn-primary text-xs px-4 py-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    {a.status === 'IN_PROGRESS' ? 'Continue' : 'Start'}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
