import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { exerciseService }  from '../../services/exerciseService'
import { templateService }  from '../../services/templateService'
import Badge from '../../components/ui/Badge'
import { ChevronLeft, Plus, X, GripVertical, CheckCircle2, Dumbbell, Search, AlertCircle } from 'lucide-react'

const MUSCLE_COLOR = {
  CHEST: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  LEGS:  'bg-amber-500/10 text-amber-400 border-amber-500/20',
  CORE:  'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  SHOULDERS: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  ARMS: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  BACK: 'bg-green-500/10 text-green-400 border-green-500/20',
  FULL_BODY: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
}

const MUSCLE_GROUPS = ['','CHEST','BACK','LEGS','SHOULDERS','ARMS','CORE','FULL_BODY']
const EX_TYPES      = ['','COUNT_BASED','TIME_BASED']

export default function CreateTemplate() {
  const { user }   = useAuth()
  const navigate   = useNavigate()
  const [allExercises,  setAllExercises]  = useState([])
  const [selected,      setSelected]      = useState([])
  const [name,          setName]          = useState('')
  const [description,   setDesc]          = useState('')
  const [search,        setSearch]        = useState('')
  const [muscleFilter,  setMuscleFilter]  = useState('')
  const [typeFilter,    setTypeFilter]    = useState('')
  const [loading,       setLoading]       = useState(true)
  const [saving,        setSaving]        = useState(false)
  const [done,          setDone]          = useState(false)
  const [error,         setError]         = useState(null)
  const [createdId,     setCreatedId]     = useState(null)

  useEffect(() => {
    exerciseService.getAll({ size: 200 })
      .then(d => setAllExercises(d.content ?? []))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const selectedIds = new Set(selected.map(e => e.id))
  const filtered = allExercises.filter(e =>
    !selectedIds.has(e.id) &&
    e.name.toLowerCase().includes(search.toLowerCase()) &&
    (!muscleFilter || e.muscleGroup === muscleFilter) &&
    (!typeFilter   || e.type === typeFilter)
  )

  const handleSave = async () => {
    if (!name.trim() || selected.length === 0) return
    setSaving(true)
    setError(null)
    try {
      const tpl = await templateService.create({
        trainerId:   user.id,
        name:        name.trim(),
        description: description.trim(),
        exercises:   selected.map(e => e.id),
      })
      setCreatedId(tpl.id)
      setDone(true)
    } catch (e) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  if (done) return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="w-20 h-20 bg-emerald-500/15 rounded-3xl flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-10 h-10 text-emerald-400" />
        </div>
        <h2 className="text-2xl font-black text-white mb-2">Template Created!</h2>
        <p className="text-zinc-400 text-sm mb-6">"{name}" is ready to assign to students.</p>
        <div className="flex gap-3 justify-center">
          <Link to="/trainer/templates" className="btn-primary px-5 py-2.5 text-sm">View Templates</Link>
          <Link to="/trainer/assign" className="px-5 py-2.5 text-sm bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-semibold transition-all">
            Assign Now
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <Link to="/trainer/templates" className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-white text-sm mb-4 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back
        </Link>
        <h1 className="text-3xl font-black text-white">Create Template</h1>
        <p className="text-zinc-500 text-sm mt-1">Build a reusable workout plan from the exercise library</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: details + picker */}
        <div className="space-y-5">
          <div className="card p-5 space-y-4">
            <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">Details</h2>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">Template Name *</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Beginner Full Body" className="input-base" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">Description</label>
              <textarea value={description} onChange={e => setDesc(e.target.value)}
                placeholder="Describe the goal and structure..." rows={3} className="input-base resize-none" />
            </div>
          </div>

          <div className="card p-5">
            <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-3">Exercise Library</h2>
            <div className="space-y-2 mb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…" className="input-base pl-9" />
              </div>
              <div className="flex gap-2">
                <select value={muscleFilter} onChange={e => setMuscleFilter(e.target.value)} className="input-base flex-1 text-xs">
                  {MUSCLE_GROUPS.map(m => <option key={m} value={m}>{m || 'All Muscles'}</option>)}
                </select>
                <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="input-base flex-1 text-xs">
                  {EX_TYPES.map(t => <option key={t} value={t}>{t || 'All Types'}</option>)}
                </select>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-8">
                <div className="w-5 h-5 border-2 border-zinc-700 border-t-orange-500 rounded-full animate-spin" />
              </div>
            ) : (
              <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                {filtered.length === 0 && <p className="text-zinc-600 text-xs text-center py-4">No exercises match</p>}
                {filtered.map(ex => (
                  <button key={ex.id} onClick={() => setSelected(s => [...s, ex])}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-800/70 transition-all group text-left">
                    <div className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center shrink-0">
                      <Dumbbell className="w-3.5 h-3.5 text-zinc-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{ex.name}</p>
                      <div className="flex gap-1.5 mt-0.5 flex-wrap">
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${MUSCLE_COLOR[ex.muscleGroup] || 'bg-zinc-700 text-zinc-400 border-zinc-600'}`}>
                          {ex.muscleGroup?.toLowerCase()}
                        </span>
                        <Badge value={ex.type} />
                      </div>
                    </div>
                    <Plus className="w-4 h-4 text-zinc-600 group-hover:text-orange-400 transition-colors shrink-0" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: selected */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">Workout Plan</h2>
            {selected.length > 0 && <span className="text-orange-400 text-xs font-semibold">{selected.length} exercises</span>}
          </div>

          {selected.length === 0 ? (
            <div className="h-48 flex flex-col items-center justify-center text-center">
              <Dumbbell className="w-8 h-8 text-zinc-700 mb-3" />
              <p className="text-zinc-500 text-sm">Add exercises from the library</p>
            </div>
          ) : (
            <div className="space-y-2 mb-5 max-h-96 overflow-y-auto pr-1">
              {selected.map((ex, i) => (
                <div key={ex.id} className="flex items-center gap-3 bg-zinc-900/60 border border-zinc-800 rounded-xl px-3 py-2.5">
                  <GripVertical className="w-4 h-4 text-zinc-700 shrink-0" />
                  <div className="w-6 h-6 bg-orange-500/15 rounded-lg flex items-center justify-center text-orange-400 text-xs font-black shrink-0">{i + 1}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{ex.name}</p>
                    <p className="text-zinc-600 text-xs">{ex.muscleGroup?.toLowerCase()} · {ex.defaultUnit?.toLowerCase()}</p>
                  </div>
                  <button onClick={() => setSelected(s => s.filter(e => e.id !== ex.id))}
                    className="text-zinc-600 hover:text-red-400 transition-colors shrink-0">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2.5 mb-3">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />{error}
            </div>
          )}

          <button onClick={handleSave} disabled={saving || !name.trim() || selected.length === 0}
            className="btn-primary w-full py-3 text-sm flex items-center justify-center gap-2">
            {saving
              ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              : <><CheckCircle2 className="w-4 h-4" /> Save Template</>
            }
          </button>
          {(!name.trim() || selected.length === 0) && (
            <p className="text-zinc-600 text-xs text-center mt-2">
              {!name.trim() ? 'Add a name to continue' : 'Add at least one exercise'}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
