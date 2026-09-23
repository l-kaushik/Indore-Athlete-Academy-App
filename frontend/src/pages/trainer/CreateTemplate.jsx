import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MOCK_EXERCISES } from '../../data/mockData'
import Badge from '../../components/ui/Badge'
import { ChevronLeft, Plus, X, GripVertical, CheckCircle2, Dumbbell, Search } from 'lucide-react'

// TODO: const exercises = await api.get('/exercises')
const ALL_EXERCISES = MOCK_EXERCISES

const MUSCLE_COLOR = {
  chest:    'bg-rose-500/10 text-rose-400 border-rose-500/20',
  legs:     'bg-amber-500/10 text-amber-400 border-amber-500/20',
  core:     'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  shoulder: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
}

export default function CreateTemplate() {
  const navigate = useNavigate()
  const [name, setName]           = useState('')
  const [description, setDesc]    = useState('')
  const [selected, setSelected]   = useState([])
  const [search, setSearch]       = useState('')
  const [saving, setSaving]       = useState(false)
  const [done, setDone]           = useState(false)

  const selectedIds = new Set(selected.map(e => e.id))
  const filtered = ALL_EXERCISES.filter(e =>
    !selectedIds.has(e.id) &&
    (e.name.toLowerCase().includes(search.toLowerCase()) ||
     e.muscle_group.toLowerCase().includes(search.toLowerCase()))
  )

  const addExercise = ex => setSelected(s => [...s, ex])
  const removeExercise = id => setSelected(s => s.filter(e => e.id !== id))

  const handleSave = async () => {
    if (!name.trim() || selected.length === 0) return
    setSaving(true)
    // TODO: await api.post('/templates', { name, description, exercises: selected.map((e, i) => ({ exercise_id: e.id, order_index: i + 1 })) })
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
          <ChevronLeft className="w-4 h-4" /> Back to Templates
        </Link>
        <h1 className="text-3xl font-black text-white">Create Template</h1>
        <p className="text-zinc-500 text-sm mt-1">Build a reusable workout plan from the exercise library</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: details + exercise picker */}
        <div className="space-y-5">
          {/* Name + description */}
          <div className="card p-5 space-y-4">
            <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">Template Details</h2>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">Template Name *</label>
              <input value={name} onChange={e => setName(e.target.value)}
                placeholder="e.g. Beginner Full Body" className="input-base" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">Description</label>
              <textarea value={description} onChange={e => setDesc(e.target.value)}
                placeholder="Describe the goal and structure of this workout..."
                rows={3}
                className="input-base resize-none" />
            </div>
          </div>

          {/* Exercise picker */}
          <div className="card p-5">
            <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-3">Exercise Library</h2>
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search exercises..." className="input-base pl-9" />
            </div>
            <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
              {filtered.length === 0 && (
                <p className="text-zinc-600 text-xs text-center py-4">All exercises added</p>
              )}
              {filtered.map(ex => (
                <button key={ex.id} onClick={() => addExercise(ex)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-800/70 transition-all group text-left">
                  <div className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center shrink-0">
                    <Dumbbell className="w-3.5 h-3.5 text-zinc-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{ex.name}</p>
                    <div className="flex gap-1.5 mt-0.5">
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${MUSCLE_COLOR[ex.muscle_group] || 'bg-zinc-700 text-zinc-400 border-zinc-600'}`}>
                        {ex.muscle_group}
                      </span>
                      <Badge value={ex.type} />
                    </div>
                  </div>
                  <Plus className="w-4 h-4 text-zinc-600 group-hover:text-orange-400 transition-colors shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: selected exercises */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">
              Workout Plan
              {selected.length > 0 && <span className="ml-2 text-orange-400">{selected.length} exercises</span>}
            </h2>
          </div>

          {selected.length === 0 ? (
            <div className="h-48 flex flex-col items-center justify-center text-center">
              <Dumbbell className="w-8 h-8 text-zinc-700 mb-3" />
              <p className="text-zinc-500 text-sm">Add exercises from the library</p>
              <p className="text-zinc-700 text-xs">They'll appear here in order</p>
            </div>
          ) : (
            <div className="space-y-2 mb-5">
              {selected.map((ex, i) => (
                <div key={ex.id} className="flex items-center gap-3 bg-zinc-900/60 border border-zinc-800 rounded-xl px-3 py-2.5">
                  <GripVertical className="w-4 h-4 text-zinc-700 shrink-0" />
                  <div className="w-6 h-6 bg-orange-500/15 rounded-lg flex items-center justify-center text-orange-400 text-xs font-black shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{ex.name}</p>
                    <p className="text-zinc-600 text-xs">{ex.muscle_group} · {ex.default_unit}</p>
                  </div>
                  <button onClick={() => removeExercise(ex.id)}
                    className="text-zinc-600 hover:text-red-400 transition-colors shrink-0">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <button onClick={handleSave}
            disabled={saving || !name.trim() || selected.length === 0}
            className="btn-primary w-full py-3 text-sm flex items-center justify-center gap-2">
            {saving
              ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              : <><CheckCircle2 className="w-4 h-4" /> Save Template</>
            }
          </button>
          {(!name.trim() || selected.length === 0) && (
            <p className="text-zinc-600 text-xs text-center mt-2">
              {!name.trim() ? 'Add a name' : 'Add at least one exercise'}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
