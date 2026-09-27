import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { userService }       from '../../services/userService'
import { templateService }   from '../../services/templateService'
import { assignmentService } from '../../services/assignmentService'
import { secondsToDuration } from '../../utils/jwt'
import { ChevronLeft, CheckCircle2, UserCheck, Dumbbell, Search, AlertCircle, User } from 'lucide-react'

// Step indicator
function Step({ n, label, active, done }) {
  return (
    <div className={`flex items-center gap-2 text-xs font-semibold ${active ? 'text-orange-400' : done ? 'text-emerald-400' : 'text-zinc-600'}`}>
      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black border ${
        active ? 'border-orange-500 bg-orange-500/15 text-orange-400' :
        done   ? 'border-emerald-500 bg-emerald-500/15 text-emerald-400' :
                 'border-zinc-700 text-zinc-600'
      }`}>{done ? '✓' : n}</div>
      {label}
    </div>
  )
}

export default function AssignWorkout() {
  const { user } = useAuth()
  const [step, setStep]               = useState(1)  // 1=student, 2=template, 3=targets
  const [student,   setStudent]       = useState(null)
  const [stuSearch, setStuSearch]     = useState('')
  const [stuLoading,setStuLoading]    = useState(false)
  const [stuError,  setStuError]      = useState('')

  const [templateId,  setTemplateId]  = useState('')
  const [template,    setTemplate]    = useState(null)
  const [tplExercises,setTplExercises]= useState([])
  const [tplLoading,  setTplLoading]  = useState(false)
  const [tplError,    setTplError]    = useState('')

  // targets: { [exerciseId]: { targetReps, targetDuration, targetWeight } }
  const [targets, setTargets] = useState({})

  const [saving, setSaving] = useState(false)
  const [done,   setDone]   = useState(false)
  const [error,  setError]  = useState(null)

  // Step 1: look up student by username
  const searchStudent = async () => {
    if (!stuSearch.trim()) return
    setStuLoading(true); setStuError('')
    try {
      const s = await userService.getByUsername(stuSearch.trim())
      if (!s.roles?.includes('STUDENT')) { setStuError('That user is not a Student'); return }
      setStudent(s)
    } catch {
      setStuError('No student found with that username')
    } finally { setStuLoading(false) }
  }

  // Step 2: load template by ID and its exercises
  const loadTemplate = async () => {
    if (!templateId.trim()) return
    setTplLoading(true); setTplError('')
    try {
      const [tpl, exData] = await Promise.all([
        templateService.getById(templateId.trim()),
        templateService.getExercises(templateId.trim(), { size: 50 }),
      ])
      setTemplate(tpl)
      const exList = exData.content ?? []
      setTplExercises(exList)
      const initTargets = {}
      exList.forEach(ex => { initTargets[ex.id] = { targetReps: '', targetDuration: '', targetWeight: '' } })
      setTargets(initTargets)
    } catch {
      setTplError('Template not found. Check the ID.')
    } finally { setTplLoading(false) }
  }

  const setTarget = (exId, field, val) =>
    setTargets(t => ({ ...t, [exId]: { ...t[exId], [field]: val } }))

  const handleAssign = async () => {
    setSaving(true); setError(null)
    try {
      const exercises = tplExercises.map(ex => {
        const t = targets[ex.id] || {}
        return {
          exerciseId:     ex.id,
          targetReps:     t.targetReps     ? Number(t.targetReps)    : null,
          targetDuration: t.targetDuration ? secondsToDuration(t.targetDuration) : null,
          targetWeight:   t.targetWeight   ? Number(t.targetWeight)  : null,
        }
      })
      await assignmentService.create({
        templateId: template.id,
        studentId:  student.id,
        trainerId:  user.id,
        status:     'ASSIGNED',
        exercises,
      })
      setDone(true)
    } catch (e) {
      setError(e.message)
    } finally { setSaving(false) }
  }

  if (done) return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="w-20 h-20 bg-emerald-500/15 rounded-3xl flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-10 h-10 text-emerald-400" />
        </div>
        <h2 className="text-2xl font-black text-white mb-2">Workout Assigned!</h2>
        <p className="text-zinc-400 text-sm mb-1">
          <span className="text-white font-semibold">"{template?.name}"</span> → {student?.fullName}
        </p>
        <p className="text-zinc-600 text-xs mb-6">Student will see it in their dashboard immediately.</p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => { setStep(1); setStudent(null); setTemplate(null); setTplExercises([]); setTemplateId(''); setStuSearch(''); setDone(false) }}
            className="px-5 py-2.5 text-sm bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-semibold transition-all">
            Assign Another
          </button>
          <Link to="/trainer/dashboard" className="btn-primary px-5 py-2.5 text-sm">Dashboard</Link>
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <Link to="/trainer/dashboard" className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-white text-sm mb-4 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back
        </Link>
        <h1 className="text-3xl font-black text-white">Assign Workout</h1>
        <p className="text-zinc-500 text-sm mt-1">Pick a student, a template, set targets, then assign</p>
      </div>

      {/* Step indicators */}
      <div className="flex items-center gap-4">
        <Step n="1" label="Student"  active={step===1} done={step>1} />
        <div className="flex-1 h-px bg-zinc-800" />
        <Step n="2" label="Template" active={step===2} done={step>2} />
        <div className="flex-1 h-px bg-zinc-800" />
        <Step n="3" label="Targets"  active={step===3} done={done} />
      </div>

      {/* ── Step 1: Find student ── */}
      {step === 1 && (
        <div className="card p-6 space-y-4">
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">Find Student by Username</h2>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
              <input value={stuSearch} onChange={e => setStuSearch(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && searchStudent()}
                placeholder="Student username…" className="input-base pl-9" />
            </div>
            <button onClick={searchStudent} disabled={stuLoading || !stuSearch.trim()}
              className="btn-primary px-4 py-2.5 text-sm flex items-center gap-2">
              {stuLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Search className="w-4 h-4" />}
            </button>
          </div>
          {stuError && <p className="text-red-400 text-xs flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5" />{stuError}</p>}
          {student && (
            <div className="bg-zinc-900/60 border border-emerald-500/30 rounded-xl p-4 flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center text-xs font-bold text-blue-400 shrink-0">
                {student.fullName?.split(' ').map(w=>w[0]).join('').slice(0,2)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold truncate">{student.fullName}</p>
                <p className="text-zinc-500 text-xs">{student.email}</p>
              </div>
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            </div>
          )}
          <div className="flex justify-end">
            <button onClick={() => setStep(2)} disabled={!student}
              className="btn-primary px-5 py-2.5 text-sm disabled:opacity-40">
              Next: Template →
            </button>
          </div>
        </div>
      )}

      {/* ── Step 2: Load template ── */}
      {step === 2 && (
        <div className="card p-6 space-y-4">
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">Load Template by ID</h2>
          <p className="text-zinc-600 text-xs">Copy the template UUID from the Templates page.</p>
          <div className="flex gap-2">
            <input value={templateId} onChange={e => setTemplateId(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && loadTemplate()}
              placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" className="input-base flex-1 font-mono text-xs" />
            <button onClick={loadTemplate} disabled={tplLoading || !templateId.trim()}
              className="btn-primary px-4 py-2.5 text-sm flex items-center gap-2">
              {tplLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Load'}
            </button>
          </div>
          {tplError && <p className="text-red-400 text-xs flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5" />{tplError}</p>}
          {template && (
            <div className="bg-zinc-900/60 border border-emerald-500/30 rounded-xl p-4">
              <p className="text-white font-semibold">{template.name}</p>
              <p className="text-zinc-400 text-xs mt-0.5">{template.description}</p>
              <p className="text-zinc-500 text-xs mt-2">{template.exerciseCount} exercises</p>
            </div>
          )}
          <div className="flex justify-between">
            <button onClick={() => setStep(1)} className="text-zinc-500 hover:text-white text-sm transition-colors">← Back</button>
            <button onClick={() => setStep(3)} disabled={!template}
              className="btn-primary px-5 py-2.5 text-sm disabled:opacity-40">
              Next: Set Targets →
            </button>
          </div>
        </div>
      )}

      {/* ── Step 3: Set targets per exercise ── */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="card p-5">
            <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-1">Set Targets</h2>
            <p className="text-zinc-600 text-xs">Leave fields blank to skip. Duration in seconds.</p>
          </div>

          {tplExercises.map((ex, i) => {
            const t = targets[ex.id] || {}
            const isTime = ex.type === 'TIME_BASED'
            return (
              <div key={ex.id} className="card p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-6 bg-orange-500/15 rounded-lg flex items-center justify-center text-orange-400 text-xs font-black shrink-0">{i+1}</div>
                  <div>
                    <p className="text-white font-semibold text-sm">{ex.name}</p>
                    <p className="text-zinc-500 text-xs">{ex.muscleGroup?.toLowerCase()} · {ex.type?.replace('_',' ').toLowerCase()}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {isTime ? (
                    <div className="col-span-2">
                      <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wide mb-1">Duration (seconds)</label>
                      <input type="number" min="0" value={t.targetDuration}
                        onChange={e => setTarget(ex.id, 'targetDuration', e.target.value)}
                        placeholder="e.g. 60" className="input-base" />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wide mb-1">Target Reps</label>
                      <input type="number" min="0" value={t.targetReps}
                        onChange={e => setTarget(ex.id, 'targetReps', e.target.value)}
                        placeholder="e.g. 12" className="input-base" />
                    </div>
                  )}
                  <div>
                    <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wide mb-1">Weight (kg)</label>
                    <input type="number" min="0" value={t.targetWeight}
                      onChange={e => setTarget(ex.id, 'targetWeight', e.target.value)}
                      placeholder="optional" className="input-base" />
                  </div>
                </div>
              </div>
            )
          })}

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />{error}
            </div>
          )}

          <div className="flex justify-between items-center">
            <button onClick={() => setStep(2)} className="text-zinc-500 hover:text-white text-sm transition-colors">← Back</button>
            <button onClick={handleAssign} disabled={saving}
              className="btn-primary px-6 py-3 text-sm flex items-center gap-2">
              {saving
                ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <><UserCheck className="w-4 h-4" /> Assign Workout</>
              }
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
