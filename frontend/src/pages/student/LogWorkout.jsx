import { useEffect, useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { assignmentService }  from '../../services/assignmentService'
import { workoutService }     from '../../services/workoutService'
import { exerciseLogService } from '../../services/exerciseLogService'
import { secondsToDuration }  from '../../utils/jwt'
import Badge from '../../components/ui/Badge'
import { ChevronLeft, Plus, Trash2, CheckCircle2, Dumbbell, Clock, Target, AlertCircle } from 'lucide-react'

const MUSCLE_COLOR = {
  CHEST: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  LEGS:  'bg-amber-500/10 text-amber-400 border-amber-500/20',
  CORE:  'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  SHOULDERS: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  ARMS: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  BACK: 'bg-green-500/10 text-green-400 border-green-500/20',
  FULL_BODY: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
}

export default function LogWorkout() {
  const { id } = useParams()   // assignment id
  const [assignment,  setAssignment]  = useState(null)
  const [exercises,   setExercises]   = useState([])   // AssignmentExerciseDto[]
  const [workoutId,   setWorkoutId]   = useState(null) // created after "start"
  const [sets,        setSets]        = useState({})   // { assignmentExerciseId: [{weight,duration,id}] }
  const [loading,     setLoading]     = useState(true)
  const [saving,      setSaving]      = useState(false)
  const [done,        setDone]        = useState(false)
  const [error,       setError]       = useState(null)
  const startedRef = useRef(false)

  // 1. Fetch assignment + exercises on mount
  useEffect(() => {
    Promise.all([
      assignmentService.getById(id),
      assignmentService.getExercises(id, { size: 50 }),
    ]).then(([asgn, exData]) => {
      setAssignment(asgn)
      const exList = exData.content ?? []
      setExercises(exList)
      const initSets = {}
      exList.forEach(ex => { initSets[ex.id] = [] })
      setSets(initSets)
    }).catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [id])

  // 2. Create + start a workout session once exercises are loaded
  useEffect(() => {
    if (exercises.length === 0 || workoutId || startedRef.current) return
    startedRef.current = true
    workoutService.create(id)
      .then(w => {
        setWorkoutId(w.id)
        return workoutService.start(w.id)
      })
      .catch(e => console.error('Workout start error:', e))
  }, [exercises, id, workoutId])

  const addSet = exId => {
    setSets(s => ({ ...s, [exId]: [...(s[exId] || []), { weight: '', duration: '', id: Date.now() }] }))
  }
  const updateSet = (exId, idx, val) => {
    setSets(s => { const a = [...s[exId]]; a[idx] = val; return { ...s, [exId]: a } })
  }
  const removeSet = (exId, idx) => {
    setSets(s => ({ ...s, [exId]: s[exId].filter((_, i) => i !== idx) }))
  }

  const handleComplete = async () => {
    setSaving(true)
    try {
      // 3. Post all logged sets
      for (const ex of exercises) {
        const exSets = sets[ex.id] || []
        for (let i = 0; i < exSets.length; i++) {
          const s = exSets[i]
          await exerciseLogService.create(workoutId, {
            assignmentExerciseId: ex.id,
            setNumber: i + 1,
            actualWeight: s.weight ? Number(s.weight) : null,
            duration: s.duration ? secondsToDuration(s.duration) : null,
          })
        }
      }
      // 4. End workout + mark assignment complete
      if (workoutId) await workoutService.end(workoutId)
      await assignmentService.updateStatus(id, 'COMPLETED')
      setDone(true)
    } catch (e) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-6 h-6 border-2 border-zinc-700 border-t-orange-500 rounded-full animate-spin" />
    </div>
  )

  if (error) return (
    <div className="max-w-lg">
      <Link to="/student/workouts" className="inline-flex items-center gap-1 text-zinc-500 hover:text-white text-sm mb-4 transition-colors">
        <ChevronLeft className="w-4 h-4" /> Back
      </Link>
      <div className="card p-6 flex items-start gap-3 text-red-400">
        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold">Something went wrong</p>
          <p className="text-sm text-red-400/70 mt-1">{error}</p>
        </div>
      </div>
    </div>
  )

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

  const totalSets = Object.values(sets).reduce((n, a) => n + a.length, 0)

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <Link to="/student/workouts" className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-white text-sm mb-4 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-black text-white">Log Workout</h1>
            <p className="text-zinc-500 text-sm mt-0.5">{exercises.length} exercises · {totalSets} sets logged</p>
          </div>
          {assignment && <Badge value={assignment.status} />}
        </div>
      </div>

      <div className="space-y-4">
        {exercises.map(ex => {
          const isTime = ex.exerciseType === 'TIME_BASED'
          const exSets = sets[ex.id] || []
          const muscleClass = MUSCLE_COLOR[ex.muscleGroup] || 'bg-zinc-800 text-zinc-400 border-zinc-700'

          return (
            <div key={ex.id} className="card p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-zinc-800 rounded-xl flex items-center justify-center shrink-0">
                    <Dumbbell className="w-4 h-4 text-zinc-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">{ex.exerciseName}</h3>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${muscleClass}`}>
                        {ex.muscleGroup?.toLowerCase()}
                      </span>
                      <Badge value={ex.exerciseType} />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-zinc-500 bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 shrink-0">
                  <Target className="w-3 h-3 text-orange-400" />
                  {isTime
                    ? <span>Target: <span className="text-white font-semibold">{ex.targetDuration}</span></span>
                    : ex.targetReps
                      ? <span>Target: <span className="text-white font-semibold">{ex.targetReps} reps</span></span>
                      : <span className="text-zinc-600">No target set</span>
                  }
                </div>
              </div>

              {/* Column headers */}
              {exSets.length > 0 && (
                <div className="flex items-center gap-2 mb-2 px-1">
                  <span className="w-7 text-center text-[10px] text-zinc-600 font-semibold uppercase">#</span>
                  {isTime
                    ? <span className="text-[10px] text-zinc-600 font-semibold uppercase w-28 text-center flex items-center gap-1"><Clock className="w-3 h-3"/>Duration (s)</span>
                    : <span className="text-[10px] text-zinc-600 font-semibold uppercase w-28 text-center">Weight (kg)</span>
                  }
                </div>
              )}

              <div className="space-y-2 mb-3">
                {exSets.map((s, i) => (
                  <div key={s.id} className="flex items-center gap-2">
                    <span className="text-xs text-zinc-600 font-semibold w-7 text-center">{i + 1}</span>
                    {isTime ? (
                      <input type="number" min="0" placeholder="secs" value={s.duration}
                        onChange={e => updateSet(ex.id, i, { ...s, duration: e.target.value })}
                        className="input-base w-28 text-center" />
                    ) : (
                      <input type="number" min="0" placeholder="kg" value={s.weight}
                        onChange={e => updateSet(ex.id, i, { ...s, weight: e.target.value })}
                        className="input-base w-28 text-center" />
                    )}
                    <button onClick={() => removeSet(ex.id, i)} className="p-1.5 text-zinc-600 hover:text-red-400 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
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

      <div className="card p-4 flex items-center justify-between">
        <div>
          <p className="text-white font-semibold text-sm">{totalSets} sets logged</p>
          <p className="text-zinc-500 text-xs">across {exercises.length} exercises</p>
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
