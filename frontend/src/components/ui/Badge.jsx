const VARIANTS = {
  assigned:    'bg-violet-500/15 text-violet-400 border-violet-500/20',
  in_progress: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  completed:   'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  STUDENT:     'bg-blue-500/10 text-blue-400 border-blue-500/20',
  TRAINER:     'bg-orange-500/10 text-orange-400 border-orange-500/20',
  ADMIN:       'bg-purple-500/10 text-purple-400 border-purple-500/20',
  count_based: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  time_based:  'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  default:     'bg-zinc-800 text-zinc-400 border-zinc-700',
}

const LABELS = {
  assigned:    'Assigned',
  in_progress: 'In Progress',
  completed:   'Completed',
  count_based: 'Count',
  time_based:  'Timed',
}

export default function Badge({ value, className = '' }) {
  const cls = VARIANTS[value] || VARIANTS.default
  const label = LABELS[value] || value
  return (
    <span className={`inline-flex items-center text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-md border ${cls} ${className}`}>
      {label}
    </span>
  )
}
