import { Bell, Search } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function Navbar() {
  const { user } = useAuth()

  return (
    <header className="h-14 bg-[#0D0D0D] border-b border-zinc-800/50 flex items-center px-6 gap-4 shrink-0">
      {/* Search */}
      <div className="flex-1 max-w-xs">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-xs text-zinc-300 placeholder-zinc-600
                       focus:outline-none focus:border-orange-500/40 transition-colors"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button className="relative p-2 rounded-xl text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-orange-500 rounded-full" />
        </button>
        <div className="h-6 w-px bg-zinc-800 mx-1" />
        <div className="flex items-center gap-2 text-right">
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-white">{user?.first_name} {user?.last_name}</p>
            <p className="text-[10px] text-zinc-500">{user?.emailId}</p>
          </div>
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
            {user?.first_name?.[0]}{user?.last_name?.[0]}
          </div>
        </div>
      </div>
    </header>
  )
}
