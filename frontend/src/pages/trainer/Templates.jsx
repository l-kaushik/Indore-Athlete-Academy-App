import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MOCK_TEMPLATES } from '../../data/mockData'
import { Plus, FileText, Dumbbell, Calendar, ChevronRight, Search } from 'lucide-react'

// TODO: const templates = await api.get('/templates?trainer_id=' + user.id)
const templates = MOCK_TEMPLATES

const MUSCLE_COLOR = {
  chest:    'bg-rose-500/10 text-rose-400',
  legs:     'bg-amber-500/10 text-amber-400',
  core:     'bg-cyan-500/10 text-cyan-400',
  shoulder: 'bg-violet-500/10 text-violet-400',
}

export default function Templates() {
  const [search, setSearch] = useState('')
  const filtered = templates.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.description.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">Workout Templates</h1>
          <p className="text-zinc-500 text-sm mt-1">Create reusable plans, assign them to your students</p>
        </div>
        <Link to="/trainer/templates/create"
          className="btn-primary px-4 py-2.5 text-sm flex items-center gap-2">
          <Plus className="w-3.5 h-3.5" /> New Template
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search templates..." className="input-base pl-9" />
      </div>

      {filtered.length === 0 ? (
        <div className="card p-12 text-center">
          <FileText className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
          <p className="text-zinc-400 font-medium">No templates found</p>
          <Link to="/trainer/templates/create" className="text-orange-400 text-sm mt-1 inline-block">Create one →</Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map(t => {
            const muscles = [...new Set(t.exercises.map(e => e.exercise.muscle_group))]
            return (
              <div key={t.id} className="card p-5 hover:border-zinc-700 transition-all group">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4 text-orange-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-base">{t.name}</h3>
                      <p className="text-zinc-500 text-xs mt-0.5 line-clamp-1">{t.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link to="/trainer/assign"
                      className="text-xs px-3 py-1.5 bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-lg font-semibold hover:bg-orange-500/20 transition-colors">
                      Assign
                    </Link>
                  </div>
                </div>

                {/* Exercises */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {t.exercises.map(ex => (
                    <div key={ex.id} className={`flex items-center gap-1 text-xs px-2 py-1 rounded-lg font-medium ${MUSCLE_COLOR[ex.exercise.muscle_group] || 'bg-zinc-800 text-zinc-400'}`}>
                      <Dumbbell className="w-3 h-3" />
                      {ex.exercise.name}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-zinc-500 border-t border-zinc-800/60 pt-3">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1"><Dumbbell className="w-3 h-3" />{t.exercises.length} exercises</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{t.created_at}</span>
                  </div>
                  <div className="flex gap-1">
                    {muscles.map(m => (
                      <span key={m} className={`px-1.5 py-0.5 rounded-md text-[10px] font-semibold ${MUSCLE_COLOR[m] || 'bg-zinc-800 text-zinc-400'}`}>{m}</span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
