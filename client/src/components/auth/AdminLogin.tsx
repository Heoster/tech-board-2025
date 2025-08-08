import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import axios from 'axios'

const AdminLogin: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    securityCode: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [isBlocked, setIsBlocked] = useState(false)
  const [blockTimeLeft, setBlockTimeLeft] = useState(0)
  const [showSecurityCode, setShowSecurityCode] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  // Security: Block after 3 failed attempts for 15 minutes
  const MAX_ATTEMPTS = 3
  const BLOCK_DURATION = 15 * 60 * 1000 // 15 minutes

  useEffect(() => {
    // Check if admin is blocked
    const blockData = localStorage.getItem('adminLoginBlock')
    if (blockData) {
      const { blockedUntil, attemptCount } = JSON.parse(blockData)
      const now = Date.now()
      
      if (now < blockedUntil) {
        setIsBlocked(true)
        setBlockTimeLeft(Math.ceil((blockedUntil - now) / 1000))
        
        const timer = setInterval(() => {
          const remaining = Math.ceil((blockedUntil - Date.now()) / 1000)
          if (remaining <= 0) {
            setIsBlocked(false)
            setBlockTimeLeft(0)
            localStorage.removeItem('adminLoginBlock')
            clearInterval(timer)
          } else {
            setBlockTimeLeft(remaining)
          }
        }, 1000)
        
        return () => clearInterval(timer)
      } else {
        localStorage.removeItem('adminLoginBlock')
        setAttempts(attemptCount)
      }
    }
  }, [])

  // Security: Generate time-based security code
  useEffect(() => {
    const generateSecurityCode = () => {
      const now = new Date()
      const hour = now.getHours()
      const minute = Math.floor(now.getMinutes() / 10) * 10 // Round to nearest 10
      return `TECH${hour}${minute}`
    }
    
    if (attempts >= 1) {
      setShowSecurityCode(true)
    }
  }, [attempts])

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
      // Security: Validate security code if required
      if (showSecurityCode) {
        const now = new Date()
        const hour = now.getHours()
        const minute = Math.floor(now.getMinutes() / 10) * 10
        const expectedCode = `TECH${hour}${minute}`
        
        if (formData.securityCode !== expectedCode) {
          throw new Error('Invalid security code')
        }
      }

      // Security: Add browser fingerprint
      const browserInfo = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        timestamp: Date.now()
      }

      const response = await axios.post('/auth/admin/login', {
        ...formData,
        browserInfo,
        securityLevel: showSecurityCode ? 'high' : 'normal'
      })
      
      const { token, admin } = response.data.data
      
      // Clear failed attempts on success
      localStorage.removeItem('adminLoginBlock')
      setAttempts(0)
      
      login(token, { ...admin, role: 'admin' })
      navigate('/admin/dashboard')
      
    } catch (error: any) {
      const newAttempts = attempts + 1
      setAttempts(newAttempts)
      
      // Security: Block after max attempts
      if (newAttempts >= MAX_ATTEMPTS) {
        const blockedUntil = Date.now() + BLOCK_DURATION
        localStorage.setItem('adminLoginBlock', JSON.stringify({
          blockedUntil,
          attemptCount: newAttempts
        }))
        setIsBlocked(true)
        setBlockTimeLeft(BLOCK_DURATION / 1000)
        setError(`Too many failed attempts. Access blocked for 15 minutes.`)
      } else {
        setShowSecurityCode(true)
        setError(error.response?.data?.error?.message || 'Login failed')
      }
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
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
            🔐 Secure Admin Access
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              ← Back to Student Login
            </Link>
          </p>
          
          {/* Security Status */}
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center justify-center space-x-2">
              <svg className="h-5 w-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-yellow-800">
                {attempts === 0 ? 'Secure Login Required' : 
                 attempts === 1 ? 'Enhanced Security Active' :
                 attempts === 2 ? 'Final Attempt Warning' : 'Access Blocked'}
              </span>
            </div>
            {attempts > 0 && !isBlocked && (
              <p className="text-xs text-yellow-700 mt-1">
                Attempts: {attempts}/{MAX_ATTEMPTS}
              </p>
            )}
          </div>
        </div>

        {isBlocked ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <svg className="mx-auto h-12 w-12 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="text-lg font-semibold text-red-800 mb-2">Access Temporarily Blocked</h3>
            <p className="text-red-700 mb-4">Too many failed login attempts detected.</p>
            <div className="text-2xl font-mono text-red-800 bg-red-100 rounded-lg py-2 px-4">
              {formatTime(blockTimeLeft)}
            </div>
            <p className="text-sm text-red-600 mt-2">Time remaining until access is restored</p>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2">
                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Admin Username</label>
                <input
                  name="username"
                  type="text"
                  required
                  autoComplete="username"
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  placeholder="Enter admin username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Admin Password</label>
                <input
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  placeholder="Enter admin password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {showSecurityCode && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <label className="block text-sm font-medium text-blue-800 mb-2">
                    🔐 Security Code Required
                  </label>
                  <input
                    name="securityCode"
                    type="text"
                    required={showSecurityCode}
                    className="appearance-none relative block w-full px-3 py-3 border border-blue-300 placeholder-blue-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter time-based security code"
                    value={formData.securityCode}
                    onChange={handleChange}
                  />
                  <p className="text-xs text-blue-600 mt-2">
                    💡 Format: TECH + current hour + current minute (rounded to 10s)
                    <br />
                    Example: If it's 14:23, enter "TECH1420"
                  </p>
                </div>
              )}
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
                {loading ? 'Authenticating...' : 'Secure Admin Login'}
              </button>
            </div>

            {/* Security Notice */}
            <div className="text-center">
              <p className="text-xs text-gray-500">
                🛡️ This is a secured admin area. All login attempts are monitored and logged.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default AdminLogin