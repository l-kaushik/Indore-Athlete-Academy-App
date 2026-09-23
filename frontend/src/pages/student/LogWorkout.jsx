import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { MOCK_ASSIGNMENTS } from '../../data/mockData'
import Badge from '../../components/ui/Badge'
import { ChevronLeft, Plus, Trash2, CheckCircle2, Dumbbell, Clock, Target } from 'lucide-react'

// TODO: const assignment = await api.get(`/assignments/${id}`)
function getAssignment(id) { return MOCK_ASSIGNMENTS.find(a => a.id === Number(id)) }

const MUSCLE_COLOR = {
  chest:    'bg-rose-500/10 text-rose-400 border-rose-500/20',
  legs:     'bg-amber-500/10 text-amber-400 border-amber-500/20',
  core:     'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  shoulder: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
}

function SetRow({ set, index, onUpdate, onRemove, isTimeBased }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-zinc-600 font-semibold w-7 text-center">{index + 1}</span>
      {isTimeBased ? (
        <input type="number" min="0" placeholder="secs" value={set.duration}
          onChange={e => onUpdate({ ...set, duration: e.target.value })}
          className="input-base w-24 text-center" />
      ) : (
        <>
          <input type="number" min="0" placeholder="reps" value={set.reps}
            onChange={e => onUpdate({ ...set, reps: e.target.value })}
            className="input-base w-24 text-center" />
          <input type="number" min="0" placeholder="kg" value={set.weight}
            onChange={e => onUpdate({ ...set, weight: e.target.value })}
            className="input-base w-24 text-center" />
        </>
      )}
      <button onClick={onRemove} className="p-1.5 text-zinc-600 hover:text-red-400 transition-colors">
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}

export default function LogWorkout() {
  const { id } = useParams()
  const navigate = useNavigate()
  const assignment = getAssignment(id)

  const initSets = {}
  assignment?.exercises.forEach(ex => { initSets[ex.id] = [] })
  const [sets, setSets] = useState(initSets)
  const [done, setDone] = useState(false)
  const [saving, setSaving] = useState(false)

  if (!assignment) return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <p className="text-zinc-400 font-medium">Workout not found</p>
        <Link to="/student/workouts" className="text-orange-400 text-sm mt-2 block">← Back to workouts</Link>
      </div>
    </div>
  )

  const addSet = exId => {
    const ex = assignment.exercises.find(e => e.id === exId)
    const blank = ex.exercise.type === 'time_based'
      ? { duration: '', id: Date.now() }
      : { reps: '', weight: '', id: Date.now() }
    setSets(s => ({ ...s, [exId]: [...(s[exId] || []), blank] }))
  }

  const updateSet = (exId, idx, val) => {
    setSets(s => {
      const arr = [...(s[exId] || [])]
      arr[idx] = val
      return { ...s, [exId]: arr }
    })
  }

  const removeSet = (exId, idx) => {
    setSets(s => ({ ...s, [exId]: s[exId].filter((_, i) => i !== idx) }))
  }

  const handleComplete = async () => {
    setSaving(true)
    // TODO: await api.post('/exercise-logs', { assignment_id: assignment.id, sets })
    // TODO: await api.patch(`/assignments/${assignment.id}`, { status: 'completed' })
    await new Promise(r => setTimeout(r, 800))
    setSaving(false)
    setDone(true)
  }

  if (done) return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="w-20 h-20 bg-emerald-500/15 rounded-3xl flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-10 h-10 text-emerald-400" />
        </div>
        <h2 className="text-3xl font-black text-white mb-2">Workout Done! 🎉</h2>
        <p className="text-zinc-400 text-sm mb-6">Great work. Your progress has been logged.</p>
        <Link to="/student/workouts" className="btn-primary px-6 py-2.5 text-sm inline-flex items-center gap-2">
          Back to Workouts
        </Link>
      </div>
    </div>
  )

  const totalSets = Object.values(sets).reduce((s, arr) => s + arr.length, 0)

  return (
    <div className="max-w-2xl space-y-6">
      {/* Back + header */}
      <div>
        <Link to="/student/workouts" className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-white text-sm mb-4 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-black text-white">{assignment.template.name}</h1>
            <p className="text-zinc-500 text-sm mt-0.5">{assignment.exercises.length} exercises · {totalSets} sets logged</p>
          </div>
          <Badge value={assignment.status} />
        </div>
      </div>

      {/* Exercises */}
      <div className="space-y-4">
        {assignment.exercises.map(ex => {
          const isTime = ex.exercise.type === 'time_based'
          const exSets = sets[ex.id] || []
          const muscleClass = MUSCLE_COLOR[ex.exercise.muscle_group] || 'bg-zinc-800 text-zinc-400 border-zinc-700'

          return (
            <div key={ex.id} className="card p-5">
              {/* Exercise header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-zinc-800 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                    <Dumbbell className="w-4 h-4 text-zinc-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">{ex.exercise.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${muscleClass}`}>
                        {ex.exercise.muscle_group}
                      </span>
                      <span className="text-zinc-600 text-xs">{ex.exercise.equipment_needed}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-zinc-500 bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5">
                  <Target className="w-3 h-3 text-orange-400" />
                  {isTime
                    ? <span>Target: <span className="text-white font-semibold">{ex.target_duration}s</span></span>
                    : <span>Target: <span className="text-white font-semibold">{ex.target_reps} reps</span></span>
                  }
                </div>
              </div>

              {/* Set column headers */}
              {exSets.length > 0 && (
                <div className="flex items-center gap-2 mb-2 px-1">
                  <span className="w-7 text-center text-[10px] text-zinc-600 font-semibold uppercase">#</span>
                  {isTime
                    ? <span className="text-[10px] text-zinc-600 font-semibold uppercase w-24 text-center flex items-center gap-1"><Clock className="w-3 h-3"/>Seconds</span>
                    : <>
                        <span className="text-[10px] text-zinc-600 font-semibold uppercase w-24 text-center">Reps</span>
                        <span className="text-[10px] text-zinc-600 font-semibold uppercase w-24 text-center">Weight (kg)</span>
                      </>
                  }
                </div>
              )}

              {/* Sets */}
              <div className="space-y-2 mb-3">
                {exSets.map((s, i) => (
                  <SetRow key={s.id} set={s} index={i} isTimeBased={isTime}
                    onUpdate={v => updateSet(ex.id, i, v)}
                    onRemove={() => removeSet(ex.id, i)} />
                ))}
              </div>

              <button onClick={() => addSet(ex.id)}
                className="flex items-center gap-1.5 text-orange-400 hover:text-orange-300 text-xs font-semibold transition-colors">
                <Plus className="w-3.5 h-3.5" /> Add Set
              </button>
            </div>
          )
        })}
      </div>

      {/* Complete button */}
      <div className="card p-4 flex items-center justify-between">
        <div>
          <p className="text-white font-semibold text-sm">{totalSets} sets logged</p>
          <p className="text-zinc-500 text-xs">across {assignment.exercises.length} exercises</p>
        </div>
        <button onClick={handleComplete} disabled={saving || totalSets === 0}
          className="btn-primary px-6 py-2.5 text-sm flex items-center gap-2">
          {saving
            ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            : <><CheckCircle2 className="w-4 h-4" /> Complete Workout</>
          }
        </button>
      </div>
    </div>
  )
}
