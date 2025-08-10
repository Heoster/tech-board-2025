import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import apiClient from '../../utils/apiClient'

interface AdminApiError {
  response?: {
    data?: {
      error?: {
        message?: string
        details?: {
          remainingSeconds?: number
        }
      }
    }
    status?: number
  }
  message?: string
}

const AdminLogin: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [isBlocked, setIsBlocked] = useState(false)
  const [blockTimeLeft, setBlockTimeLeft] = useState(0)
  const { login } = useAuth()
  const navigate = useNavigate()

  // Check for existing lockout on component mount
  useEffect(() => {
    const checkLockout = () => {
      const lockoutEnd = localStorage.getItem('adminLockoutEnd')
      if (lockoutEnd) {
        const timeLeft = parseInt(lockoutEnd) - Date.now()
        if (timeLeft > 0) {
          setIsBlocked(true)
          setBlockTimeLeft(Math.ceil(timeLeft / 1000))

          // Start countdown
          const interval = setInterval(() => {
            const remaining = parseInt(lockoutEnd) - Date.now()
            if (remaining <= 0) {
              setIsBlocked(false)
              setBlockTimeLeft(0)
              localStorage.removeItem('adminLockoutEnd')
              clearInterval(interval)
            } else {
              setBlockTimeLeft(Math.ceil(remaining / 1000))
            }
          }, 1000)

          return () => clearInterval(interval)
        } else {
          localStorage.removeItem('adminLockoutEnd')
        }
      }
    }

    checkLockout()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isBlocked) {
      setError(`Access blocked. Try again in ${Math.ceil(blockTimeLeft / 60)} minutes.`)
      return
    }

    setError('')
    setLoading(true)

    try {
      // Security: Add browser fingerprint
      const browserInfo = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        timestamp: Date.now()
      }

      const response = await apiClient.post('/auth/admin/login', {
        ...formData,
        browserInfo,
        securityLevel: 'normal'
      })

      const { token, admin } = response.data.data

      // Store token and redirect
      login(token, { ...admin, role: 'admin' })
      navigate('/admin/dashboard')

    } catch (error: unknown) {
      console.error('Admin login error:', error)
      const apiError = error as AdminApiError;

      if (apiError.response?.status === 423) {
        // Account locked
        const lockoutData = apiError.response.data?.error?.details
        if (lockoutData?.remainingSeconds) {
          const lockoutEnd = Date.now() + (lockoutData.remainingSeconds * 1000)
          localStorage.setItem('adminLockoutEnd', lockoutEnd.toString())
          setIsBlocked(true)
          setBlockTimeLeft(lockoutData.remainingSeconds)
          setError(`Account locked. Try again in ${Math.ceil(lockoutData.remainingSeconds / 60)} minutes.`)
        }
      } else {
        setError(apiError.response?.data?.error?.message || 'Login failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mb-4">
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            🔐 Admin Access
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              ← Back to Student Login
            </Link>
          </p>

          {/* Security Status */}
          {isBlocked && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Access Temporarily Blocked</span>
              </div>
              <p className="mt-1 text-sm">
                Too many failed login attempts detected.<br />
                <strong>{Math.ceil(blockTimeLeft / 60)}:{String(blockTimeLeft % 60).padStart(2, '0')}</strong> time remaining until access is restored.
              </p>
            </div>
          )}
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Admin Username</label>
              <input
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm"
                placeholder="Enter admin username"
                value={formData.username}
                onChange={handleChange}
                disabled={loading || isBlocked}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Admin Password</label>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm"
                placeholder="Enter admin password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading || isBlocked}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || isBlocked}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-red-300 group-hover:text-red-200" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </span>
              {loading ? 'Authenticating...' : isBlocked ? `Blocked (${Math.ceil(blockTimeLeft / 60)}m)` : 'Admin Login'}
            </button>
          </div>

          {/* Security Notice */}
          <div className="text-center">
            <p className="text-xs text-gray-500">
              🛡️ This is a secured admin area. All login attempts are monitored and logged.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin