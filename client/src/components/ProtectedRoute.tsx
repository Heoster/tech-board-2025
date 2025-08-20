import React, { type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface ProtectedRouteProps {
  children: ReactNode
  role?: 'student' | 'admin'
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const { user, loading, token } = useAuth()

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    )
  }

  // Redirect to login if no user or token
  if (!user || !token) {
    console.log('Access denied: User must login first')
    return <Navigate to="/login" replace />
  }

  // Role-based access control
  if (role && user.role !== role) {
    console.log(`Access denied: Required role '${role}', but user has role '${user.role}'`)
    // Redirect to appropriate dashboard based on user role
    const redirectPath = user.role === 'admin' ? '/admin/dashboard' : '/dashboard'
    return <Navigate to={redirectPath} replace />
  }

  // Authentication and authorization successful
  return <>{children}</>
}

export default ProtectedRoute