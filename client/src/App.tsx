import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import TechnoBoardLanding from './components/LandingPage'
import ModernLoginForm from './components/auth/ModernLoginForm'
import QuizInterface from './components/QuizInterface'
import TestSubmitted from './components/TestSubmitted'

import StudentRegistration from './components/auth/StudentRegistration'
import Dashboard from './components/student/Dashboard'
import AdminLogin from './components/auth/AdminLogin'
import AdminDashboard from './components/admin/AdminDashboard'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <Routes>
          {/* Public routes - Landing and Authentication only */}
          <Route path="/" element={<TechnoBoardLanding />} />
          <Route path="/login" element={<ModernLoginForm />} />
          <Route path="/register" element={<StudentRegistration />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected student routes - LOGIN REQUIRED */}
          <Route path="/dashboard" element={
            <ProtectedRoute role="student">
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="/test" element={
            <ProtectedRoute role="student">
              <QuizInterface />
            </ProtectedRoute>
          } />

          <Route path="/test-submitted" element={
            <ProtectedRoute role="student">
              <TestSubmitted />
            </ProtectedRoute>
          } />

          {/* Protected admin routes - ADMIN LOGIN REQUIRED */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />



          {/* Catch-all route - redirect to landing page */}
          <Route path="*" element={<TechnoBoardLanding />} />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App