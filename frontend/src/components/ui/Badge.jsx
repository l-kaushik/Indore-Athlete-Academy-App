// Handles both API enums (ASSIGNED, IN_PROGRESS, COUNT_BASED…) and display
const STYLES = {
  // Assignment status
  ASSIGNED:    'bg-violet-500/15 text-violet-400 border-violet-500/20',
  IN_PROGRESS: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  COMPLETED:   'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  // Roles
  STUDENT:     'bg-blue-500/10 text-blue-400 border-blue-500/20',
  TRAINER:     'bg-orange-500/10 text-orange-400 border-orange-500/20',
  ADMIN:       'bg-purple-500/10 text-purple-400 border-purple-500/20',
  // Exercise type
  COUNT_BASED: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  TIME_BASED:  'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
}

const LABELS = {
  ASSIGNED:    'Assigned',
  IN_PROGRESS: 'In Progress',
  COMPLETED:   'Completed',
  COUNT_BASED: 'Count',
  TIME_BASED:  'Timed',
}

export default function Badge({ value, className = '' }) {
  const style = STYLES[value] ?? 'bg-zinc-800 text-zinc-400 border-zinc-700'
  const label = LABELS[value] ?? value
  return (
    <span className={`inline-flex items-center text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-md border ${style} ${className}`}>
      {label}
    </span>
  )
}
