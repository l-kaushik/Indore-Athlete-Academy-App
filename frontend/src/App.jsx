import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Layout from './components/layout/Layout'

// Auth
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

// Student
import StudentDashboard from './pages/student/StudentDashboard'
import MyWorkouts from './pages/student/MyWorkouts'
import LogWorkout from './pages/student/LogWorkout'

// Trainer
import TrainerDashboard from './pages/trainer/TrainerDashboard'
import Templates from './pages/trainer/Templates'
import CreateTemplate from './pages/trainer/CreateTemplate'
import AssignWorkout from './pages/trainer/AssignWorkout'

// Admin
import AdminDashboard from './pages/admin/AdminDashboard'
import UserManagement from './pages/admin/UserManagement'

function RoleRedirect() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (user.role === 'STUDENT') return <Navigate to="/student/dashboard" replace />
  if (user.role === 'TRAINER') return <Navigate to="/trainer/dashboard" replace />
  if (user.role === 'ADMIN')   return <Navigate to="/admin/dashboard" replace />
  return <Navigate to="/login" replace />
}

function ProtectedRoute({ children, role }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (role && user.role !== role) return <RoleRedirect />
  return children
}

function AppRoutes() {
  const { user } = useAuth()
  return (
    <Routes>
      <Route path="/login"    element={user ? <RoleRedirect /> : <Login />} />
      <Route path="/register" element={user ? <RoleRedirect /> : <Register />} />
      <Route path="/"         element={<RoleRedirect />} />

      {/* Student */}
      <Route path="/student" element={<ProtectedRoute role="STUDENT"><Layout /></ProtectedRoute>}>
        <Route path="dashboard"          element={<StudentDashboard />} />
        <Route path="workouts"           element={<MyWorkouts />} />
        <Route path="workouts/:id/log"   element={<LogWorkout />} />
      </Route>

      {/* Trainer */}
      <Route path="/trainer" element={<ProtectedRoute role="TRAINER"><Layout /></ProtectedRoute>}>
        <Route path="dashboard"        element={<TrainerDashboard />} />
        <Route path="templates"        element={<Templates />} />
        <Route path="templates/create" element={<CreateTemplate />} />
        <Route path="assign"           element={<AssignWorkout />} />
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
