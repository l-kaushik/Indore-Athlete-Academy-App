export default function StatCard({ icon: Icon, label, value, sub, accent = 'orange' }) {
  const colors = {
    orange:  'from-orange-500/20 to-orange-500/5 text-orange-400',
    blue:    'from-blue-500/20 to-blue-500/5 text-blue-400',
    emerald: 'from-emerald-500/20 to-emerald-500/5 text-emerald-400',
    violet:  'from-violet-500/20 to-violet-500/5 text-violet-400',
  }
  const iconBg = {
    orange:  'bg-orange-500/15 text-orange-400',
    blue:    'bg-blue-500/15 text-blue-400',
    emerald: 'bg-emerald-500/15 text-emerald-400',
    violet:  'bg-violet-500/15 text-violet-400',
  }

  return (
    <div className={`card p-5 bg-gradient-to-br ${colors[accent]} relative overflow-hidden`}>
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg[accent]}`}>
            <Icon className="w-5 h-5" />
          </div>
        </div>
        <p className="text-3xl font-black text-white mb-0.5">{value}</p>
        <p className="text-sm font-medium text-zinc-300">{label}</p>
        {sub && <p className="text-xs text-zinc-500 mt-1">{sub}</p>}
      </div>
    </div>
  )
}
