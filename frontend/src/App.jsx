import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { getPrimaryRole } from './utils/jwt'
import Layout from './components/layout/Layout'

import Login    from './pages/auth/Login'
import Register from './pages/auth/Register'

import StudentDashboard from './pages/student/StudentDashboard'
import MyWorkouts       from './pages/student/MyWorkouts'
import LogWorkout       from './pages/student/LogWorkout'

import TrainerDashboard from './pages/trainer/TrainerDashboard'
import Templates        from './pages/trainer/Templates'
import CreateTemplate   from './pages/trainer/CreateTemplate'
import AssignWorkout    from './pages/trainer/AssignWorkout'

import AdminDashboard  from './pages/admin/AdminDashboard'
import UserManagement  from './pages/admin/UserManagement'

function RoleRedirect() {
  const { user, loading } = useAuth()
  if (loading) return <LoadingScreen />
  if (!user)   return <Navigate to="/login" replace />
  const role = getPrimaryRole(user.roles)
  if (role === 'ADMIN')   return <Navigate to="/admin/dashboard"   replace />
  if (role === 'TRAINER') return <Navigate to="/trainer/dashboard" replace />
  return <Navigate to="/student/dashboard" replace />
}

function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth()
  if (loading) return <LoadingScreen />
  if (!user)   return <Navigate to="/login" replace />
  if (role && !user.roles?.includes(role)) return <RoleRedirect />
  return children
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-zinc-700 border-t-orange-500 rounded-full animate-spin" />
        <p className="text-zinc-500 text-sm">Loading...</p>
      </div>
    </div>
  )
}

function AppRoutes() {
  const { user, loading } = useAuth()
  if (loading) return <LoadingScreen />

  return (
    <Routes>
      <Route path="/login"    element={user ? <RoleRedirect /> : <Login />} />
      <Route path="/register" element={user ? <RoleRedirect /> : <Register />} />
      <Route path="/"         element={<RoleRedirect />} />

      {/* Student */}
      <Route path="/student" element={<ProtectedRoute role="STUDENT"><Layout /></ProtectedRoute>}>
        <Route path="dashboard"        element={<StudentDashboard />} />
        <Route path="workouts"         element={<MyWorkouts />} />
        <Route path="workouts/:id/log" element={<LogWorkout />} />
      </Route>

      {/* Trainer */}
      <Route path="/trainer" element={<ProtectedRoute role="TRAINER"><Layout /></ProtectedRoute>}>
        <Route path="dashboard"         element={<TrainerDashboard />} />
        <Route path="templates"         element={<Templates />} />
        <Route path="templates/create"  element={<CreateTemplate />} />
        <Route path="assign"            element={<AssignWorkout />} />
      </Route>

      {/* Admin */}
      <Route path="/admin" element={<ProtectedRoute role="ADMIN"><Layout /></ProtectedRoute>}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users"     element={<UserManagement />} />
      </Route>

      <Route path="*" element={<RoleRedirect />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}
