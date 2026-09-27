import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { getPrimaryRole, initials } from '../../utils/jwt'
import { LayoutDashboard, Dumbbell, FileText, UserCheck, Users, LogOut, Zap } from 'lucide-react'

const NAV = {
  STUDENT: [
    { to: '/student/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/student/workouts',  icon: Dumbbell,        label: 'My Workouts' },
  ],
  TRAINER: [
    { to: '/trainer/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/trainer/templates', icon: FileText,        label: 'Templates' },
    { to: '/trainer/assign',    icon: UserCheck,       label: 'Assign Workout' },
  ],
  ADMIN: [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/users',     icon: Users,           label: 'User Management' },
  ],
}

const ROLE_PILL = {
  STUDENT: 'bg-blue-500/10 text-blue-400',
  TRAINER: 'bg-orange-500/10 text-orange-400',
  ADMIN:   'bg-purple-500/10 text-purple-400',
}

export default function Sidebar() {
  const { user, logout } = useAuth()
  const navigate         = useNavigate()
  const primaryRole      = getPrimaryRole(user?.roles)
  const navItems         = NAV[primaryRole] || []
  const avatarInitials   = initials(user?.fullName)

  const handleLogout = async () => { await logout(); navigate('/login') }

  return (
    <aside className="w-60 bg-[#111111] border-r border-zinc-800/50 flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-zinc-800/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Zap className="w-4 h-4 text-white" fill="white" />
          </div>
          <div className="leading-tight">
            <p className="text-white font-bold text-sm">Indore Athlete</p>
            <p className="text-zinc-500 text-xs">Academy</p>
          </div>
        </div>
      </div>

      {/* User card */}
      <div className="px-4 py-4 border-b border-zinc-800/50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0">
            {avatarInitials}
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-semibold truncate">{user?.fullName}</p>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${ROLE_PILL[primaryRole]}`}>
              {primaryRole}
            </span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 space-y-0.5">
        <p className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest px-3 pb-2 pt-1">Menu</p>
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-orange-500/15 text-orange-400 border border-orange-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/70'
              }`
            }>
            <Icon className="w-4 h-4 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-zinc-800/50">
        <button onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all">
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </aside>
  )
}
