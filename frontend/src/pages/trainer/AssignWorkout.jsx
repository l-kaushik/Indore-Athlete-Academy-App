import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MOCK_STUDENTS, MOCK_TEMPLATES } from '../../data/mockData'
import Badge from '../../components/ui/Badge'
import { ChevronLeft, CheckCircle2, UserCheck, Dumbbell, Search, ChevronDown } from 'lucide-react'

// TODO: Replace with API calls
const students  = MOCK_STUDENTS
const templates = MOCK_TEMPLATES

const MUSCLE_COLOR = {
  chest:    'bg-rose-500/10 text-rose-400',
  legs:     'bg-amber-500/10 text-amber-400',
  core:     'bg-cyan-500/10 text-cyan-400',
  shoulder: 'bg-violet-500/10 text-violet-400',
}

export default function AssignWorkout() {
  const [student,  setStudent]  = useState(null)
  const [template, setTemplate] = useState(null)
  const [saving, setSaving]     = useState(false)
  const [done, setDone]         = useState(false)
  const [stuSearch, setStuSearch] = useState('')
  const [tplSearch, setTplSearch] = useState('')

  const filteredStudents  = students.filter(s =>
    `${s.first_name} ${s.last_name} ${s.emailId}`.toLowerCase().includes(stuSearch.toLowerCase())
  )
  const filteredTemplates = templates.filter(t =>
    t.name.toLowerCase().includes(tplSearch.toLowerCase())
  )

  const handleAssign = async () => {
    if (!student || !template) return
    setSaving(true)
    // TODO: await api.post('/assignments', { template_id: template.id, student_id: student.id, trainer_id: user.id })
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
        <h2 className="text-2xl font-black text-white mb-2">Workout Assigned!</h2>
        <p className="text-zinc-400 text-sm mb-1">
          <span className="text-white font-semibold">"{template.name}"</span> → {student.first_name} {student.last_name}
        </p>
        <p className="text-zinc-600 text-xs mb-6">Student will see it in their dashboard immediately.</p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => { setStudent(null); setTemplate(null); setDone(false) }}
            className="px-5 py-2.5 text-sm bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-semibold transition-all">
            Assign Another
          </button>
          <Link to="/trainer/dashboard" className="btn-primary px-5 py-2.5 text-sm">Back to Dashboard</Link>
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <Link to="/trainer/dashboard" className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-white text-sm mb-4 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back
        </Link>
        <h1 className="text-3xl font-black text-white">Assign Workout</h1>
        <p className="text-zinc-500 text-sm mt-1">Pick a student and a template to create an assignment</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Student selector */}
        <div className="card p-5">
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-3">
            1 · Select Student
          </h2>
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
            <input value={stuSearch} onChange={e => setStuSearch(e.target.value)}
              placeholder="Search students..." className="input-base pl-9" />
          </div>
          <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
            {filteredStudents.map(s => (
              <button key={s.id} onClick={() => setStudent(s)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${
                  student?.id === s.id
                    ? 'bg-orange-500/15 border border-orange-500/30'
                    : 'hover:bg-zinc-800/70 border border-transparent'
                }`}>
                <div className="w-8 h-8 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center text-xs font-bold text-blue-400 shrink-0">
                  {s.first_name[0]}{s.last_name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{s.first_name} {s.last_name}</p>
                  <p className="text-zinc-600 text-xs">{s.emailId}</p>
                </div>
                {student?.id === s.id && <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />}
              </button>
            ))}
          </div>
        </div>

        {/* Template selector */}
        <div className="card p-5">
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-3">
            2 · Select Template
          </h2>
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
            <input value={tplSearch} onChange={e => setTplSearch(e.target.value)}
              placeholder="Search templates..." className="input-base pl-9" />
          </div>
          <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
            {filteredTemplates.map(t => (
              <button key={t.id} onClick={() => setTemplate(t)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${
                  template?.id === t.id
                    ? 'bg-orange-500/15 border border-orange-500/30'
                    : 'hover:bg-zinc-800/70 border border-transparent'
                }`}>
                <div className="w-8 h-8 bg-orange-500/10 border border-orange-500/20 rounded-lg flex items-center justify-center shrink-0">
                  <Dumbbell className="w-3.5 h-3.5 text-orange-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{t.name}</p>
                  <p className="text-zinc-600 text-xs">{t.exercises.length} exercises</p>
                </div>
                {template?.id === t.id && <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Preview */}
      {(student || template) && (
        <div className="card p-5">
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-4">Assignment Preview</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4">
              <p className="text-xs text-zinc-500 mb-2">Student</p>
              {student ? (
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center text-xs font-bold text-blue-400">
                    {student.first_name[0]}{student.last_name[0]}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{student.first_name} {student.last_name}</p>
                    <p className="text-zinc-600 text-xs">{student.emailId}</p>
                  </div>
                </div>
              ) : <p className="text-zinc-600 text-sm">Not selected</p>}
            </div>
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4">
              <p className="text-xs text-zinc-500 mb-2">Template</p>
              {template ? (
                <div>
                  <p className="text-white text-sm font-semibold">{template.name}</p>
                  <p className="text-zinc-600 text-xs mt-0.5">{template.exercises.length} exercises</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {template.exercises.map(ex => (
                      <span key={ex.id} className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${MUSCLE_COLOR[ex.exercise.muscle_group] || 'bg-zinc-800 text-zinc-500'}`}>
                        {ex.exercise.name}
                      </span>
                    ))}
                  </div>
                </div>
              ) : <p className="text-zinc-600 text-sm">Not selected</p>}
            </div>
          </div>
        </div>
      )}

      {/* Assign button */}
      <div className="flex items-center justify-between">
        <p className="text-zinc-600 text-sm">
          {!student && !template ? 'Select a student and template above' :
           !student ? 'Select a student' :
           !template ? 'Select a template' :
           'Ready to assign!'}
        </p>
        <button onClick={handleAssign} disabled={saving || !student || !template}
          className="btn-primary px-6 py-3 text-sm flex items-center gap-2">
          {saving
            ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            : <><UserCheck className="w-4 h-4" /> Assign Workout</>
          }
        </button>
      </div>
    </div>
  )
}
