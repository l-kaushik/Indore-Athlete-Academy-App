import { Link } from 'react-router-dom'
import { Plus, FileText, Info } from 'lucide-react'

// NOTE: GET /api/v1/workout-templates (list) is not in the current API spec.
// Only GET /api/v1/workout-templates/{id} (by ID) is available.
// Template list will be wired once that endpoint is added.

export default function Templates() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">Workout Templates</h1>
          <p className="text-zinc-500 text-sm mt-1">Create reusable plans, assign them to your students</p>
        </div>
        <Link to="/trainer/templates/create" className="btn-primary px-4 py-2.5 text-sm flex items-center gap-2">
          <Plus className="w-3.5 h-3.5" /> New Template
        </Link>
      </div>

      <div className="flex items-start gap-3 bg-amber-500/5 border border-amber-500/20 rounded-xl px-4 py-3">
        <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p className="text-amber-300/80 text-xs leading-relaxed">
          <span className="font-semibold">Backend gap:</span> A list endpoint for templates (<code className="bg-amber-500/10 px-1 rounded">GET /api/v1/workout-templates</code>) is not in the current API spec.
          You can still <strong>create</strong> templates and <strong>load them by ID</strong> in the Assign Workout flow.
          Copy the UUID from the response after creating a template and use it when assigning.
        </p>
      </div>

      <div className="card p-12 text-center">
        <FileText className="w-10 h-10 text-zinc-700 mx-auto mb-4" />
        <p className="text-white font-semibold mb-1">No template list yet</p>
        <p className="text-zinc-500 text-sm mb-6 max-w-sm mx-auto">
          Templates you create are stored in the backend. Once the list API is live, they'll appear here.
        </p>
        <Link to="/trainer/templates/create" className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm">
          <Plus className="w-4 h-4" /> Create a Template
        </Link>
      </div>
    </div>
  )
}
