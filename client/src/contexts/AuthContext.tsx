import React, { createContext, useState, useEffect, type ReactNode } from 'react'
import axios, { AxiosError } from 'axios'
import { SecureStorage, InputValidator, APISecurityManager } from '../utils/security'

interface User {
  id: number
  role: 'student' | 'admin'
  name?: string
  rollNumber?: number
  grade?: number
  section?: string
  username?: string
  email?: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (token: string, userData: User) => void
  logout: () => void
  loading: boolean
  isAuthenticated: boolean
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Set up axios defaults with security configurations
  const isDev = import.meta.env.DEV
  const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    (isDev ? 'http://localhost:8000/api' : '/api')
  
  axios.defaults.baseURL = API_BASE_URL
  axios.defaults.timeout = 30000 // 30 second timeout
  axios.defaults.headers.common['Content-Type'] = 'application/json'

  // Add response interceptor for security
  axios.interceptors.response.use(
    (response) => {
      // Sanitize response data
      if (response.data) {
        response.data = APISecurityManager.sanitizeApiResponse(response.data)
      }
      return response
    },
    (error: AxiosError) => {
      // Handle authentication errors
      if (error.response?.status === 401 || error.response?.status === 403) {
        // Token might be expired or invalid
        logout()
      }
      
      // Sanitize error messages
      if (error.response?.data) {
        error.response.data = APISecurityManager.sanitizeApiResponse(error.response.data)
      }
      
      return Promise.reject(error)
    }
  )

  useEffect(() => {
    initializeAuth()
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  const initializeAuth = async () => {
    try {
      const storedToken = SecureStorage.getToken()
      const storedUser = SecureStorage.getUserData()

      if (storedToken && storedUser) {
        // Validate stored user data
        if (validateUserData(storedUser)) {
          setToken(storedToken)
          setUser(storedUser)
          setAuthHeader(storedToken)
          
          // Verify token is still valid
          await verifyToken(storedToken)
        } else {
          console.warn('Invalid stored user data, clearing storage')
          logout()
        }
      }
    } catch (error) {
      console.error('Error initializing auth:', error)
      logout()
    } finally {
      setLoading(false)
    }
  }

  const validateUserData = (userData: unknown): userData is User => {
    if (!userData || typeof userData !== 'object') return false
    
    const data = userData as Record<string, unknown>
    
    // Validate required fields
    if (typeof data.id !== 'number' || typeof data.role !== 'string') return false
    
    // Validate role
    if (!['student', 'admin'].includes(data.role)) return false
    
    // Validate student-specific fields
    if (data.role === 'student') {
      if (data.rollNumber && !InputValidator.validateRollNumber(data.rollNumber as number)) return false
      if (data.grade && !InputValidator.validateGrade(data.grade as number)) return false
      if (data.section && !InputValidator.validateSection(data.section as string)) return false
    }
    
    // Validate name if present
    if (data.name && !InputValidator.isValidInput(data.name as string)) return false
    
    return true
  }

  const setAuthHeader = (tokenValue: string) => {
    if (tokenValue) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${tokenValue}`
    } else {
      delete axios.defaults.headers.common['Authorization']
    }
  }

  const verifyToken = async (tokenToVerify: string): Promise<void> => {
    try {
      const response = await axios.get('auth/verify', {
        headers: { Authorization: `Bearer ${tokenToVerify}` },
        timeout: 10000 // Short timeout for verification
      })
      
      // Validate the verification response
      if (!response.data?.success) {
        throw new Error('Token verification failed')
      }
    } catch (error) {
      console.warn('Token verification failed, logging out')
      logout()
      throw error
    }
  }

  const login = (newToken: string, userData: User): void => {
    try {
      // Validate inputs
      if (!newToken || typeof newToken !== 'string' || !newToken.includes('.')) {
        throw new Error('Invalid token format')
      }
      
      if (!validateUserData(userData)) {
        throw new Error('Invalid user data')
      }

      // Sanitize user data
      const sanitizedUserData = sanitizeUserData(userData)

      setToken(newToken)
      setUser(sanitizedUserData)
      
      // Use secure storage
      SecureStorage.setToken(newToken)
      SecureStorage.setUserData(sanitizedUserData)
      
      setAuthHeader(newToken)
      
      console.info('User authenticated successfully')
    } catch (error) {
      console.error('Login failed:', error)
      logout()
      throw error
    }
  }

  const sanitizeUserData = (userData: User): User => {
    const sanitized: User = {
      id: userData.id,
      role: userData.role
    }

    // Sanitize optional string fields
    if (userData.name) {
      sanitized.name = InputValidator.sanitizeInput(userData.name)
    }
    
    if (userData.username) {
      sanitized.username = InputValidator.sanitizeInput(userData.username)
    }
    
    if (userData.email) {
      sanitized.email = InputValidator.sanitizeInput(userData.email)
    }

    // Copy numeric fields directly (already validated)
    if (userData.rollNumber) sanitized.rollNumber = userData.rollNumber
    if (userData.grade) sanitized.grade = userData.grade
    if (userData.section) sanitized.section = userData.section

    return sanitized
  }

  const logout = (): void => {
    try {
      setToken(null)
      setUser(null)
      
      // Clear secure storage
      SecureStorage.clearAll()
      
      // Remove auth header
      setAuthHeader('')
      
      console.info('User logged out successfully')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    loading,
    isAuthenticated: !!(user && token)
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export { AuthProvider }