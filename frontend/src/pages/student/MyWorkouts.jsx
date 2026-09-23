import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MOCK_ASSIGNMENTS } from '../../data/mockData'
import Badge from '../../components/ui/Badge'
import { Dumbbell, ChevronRight, Calendar, User } from 'lucide-react'

// TODO: Replace with: const assignments = await api.get(`/assignments?student_id=${user.id}`)
const assignments = MOCK_ASSIGNMENTS

const TABS = [
  { key: 'all',         label: 'All' },
  { key: 'assigned',    label: 'Assigned' },
  { key: 'in_progress', label: 'In Progress' },
  { key: 'completed',   label: 'Completed' },
]

const MUSCLE_COLOR = {
  chest:    'bg-rose-500/10 text-rose-400',
  legs:     'bg-amber-500/10 text-amber-400',
  core:     'bg-cyan-500/10 text-cyan-400',
  shoulder: 'bg-violet-500/10 text-violet-400',
}

export default function MyWorkouts() {
  const [tab, setTab] = useState('all')

  const filtered = tab === 'all' ? assignments : assignments.filter(a => a.status === tab)

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-black text-white">My Workouts</h1>
        <p className="text-zinc-500 text-sm mt-1">Track and log all your assigned workout plans</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1.5 bg-zinc-900/60 border border-zinc-800 rounded-xl p-1 w-fit">
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              tab === t.key
                ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/30'
                : 'text-zinc-400 hover:text-white'
            }`}>
            {t.label}
            <span className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded-md ${
              tab === t.key ? 'bg-white/20 text-white' : 'bg-zinc-800 text-zinc-500'
            }`}>
              {t.key === 'all' ? assignments.length : assignments.filter(a => a.status === t.key).length}
            </span>
          </button>
        ))}
      </div>

      {/* Workout cards */}
      {filtered.length === 0 ? (
        <div className="card p-12 text-center">
          <Dumbbell className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
          <p className="text-zinc-400 font-medium">No workouts here</p>
          <p className="text-zinc-600 text-sm">Your trainer hasn't assigned any yet.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map(a => (
            <div key={a.id} className="card p-5 hover:border-zinc-700 transition-all group">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    a.status === 'completed'   ? 'bg-emerald-500/15' :
                    a.status === 'in_progress' ? 'bg-blue-500/15'    : 'bg-zinc-800'
                  }`}>
                    <Dumbbell className={`w-4 h-4 ${
                      a.status === 'completed'   ? 'text-emerald-400' :
                      a.status === 'in_progress' ? 'text-blue-400'    : 'text-zinc-500'
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base">{a.template.name}</h3>
                    <p className="text-zinc-500 text-xs mt-0.5 line-clamp-1">{a.template.description}</p>
                  </div>
                </div>
                <Badge value={a.status} />
              </div>

              {/* Exercise chips */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {a.exercises.map(ex => (
                  <span key={ex.id} className={`text-xs px-2 py-1 rounded-lg font-medium ${MUSCLE_COLOR[ex.exercise.muscle_group] || 'bg-zinc-800 text-zinc-400'}`}>
                    {ex.exercise.name}
                    {ex.target_reps ? ` · ${ex.target_reps} reps` : ex.target_duration ? ` · ${ex.target_duration}s` : ''}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-zinc-500">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{a.assigned_at}</span>
                  <span className="flex items-center gap-1"><User className="w-3 h-3" />Trainer #{a.trainer_id}</span>
                  <span>{a.exercises.length} exercises</span>
                </div>
                {a.status !== 'completed' && (
                  <Link to={`/student/workouts/${a.id}/log`}
                    className="btn-primary text-xs px-4 py-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    {a.status === 'in_progress' ? 'Continue' : 'Start'}
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
