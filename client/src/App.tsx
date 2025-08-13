import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import LoadingSpinner from './components/LoadingSpinner'
import './App.css'

// Lazy load components for code splitting
const TechnoBoardLanding = lazy(() => import('./components/TechnoBoardLanding'))
const ModernLoginForm = lazy(() => import('./components/auth/ModernLoginForm'))
const StudentRegistration = lazy(() => import('./components/auth/StudentRegistration'))
const AdminLogin = lazy(() => import('./components/auth/AdminLogin'))

// Student components (separate chunk)
const Dashboard = lazy(() => import('./components/student/Dashboard'))
const QuizInterface = lazy(() => import('./components/QuizInterface'))
const TestSubmitted = lazy(() => import('./components/TestSubmitted'))

// Admin components (separate chunk)
const AdminPanel = lazy(() => import('./components/admin/AdminPanel'))

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <Suspense fallback={<LoadingSpinner />}>
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
                <AdminPanel />
              </ProtectedRoute>
            } />

            {/* Catch-all route - redirect to landing page */}
            <Route path="*" element={<TechnoBoardLanding />} />
          </Routes>
        </Suspense>
      </div>
    </AuthProvider>
  )
}

export default App