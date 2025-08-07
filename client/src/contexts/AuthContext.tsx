import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import axios from 'axios'

interface User {
  id: number
  role: 'student' | 'admin'
  [key: string]: any
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (token: string, userData: User) => void
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Set up axios defaults
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://tech-board.up.railway.app/api'
  axios.defaults.baseURL = API_BASE_URL

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')

    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        setToken(storedToken)
        setUser(userData)
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`
        
        // Verify token is still valid
        verifyToken(storedToken)
      } catch (error) {
        console.error('Error parsing stored user data:', error)
        logout()
      }
    }
    setLoading(false)
  }, [])

  const verifyToken = async (tokenToVerify: string) => {
    try {
      await axios.get('/auth/verify', {
        headers: { Authorization: `Bearer ${tokenToVerify}` }
      })
    } catch (error) {
      console.log('Token verification failed, logging out')
      logout()
    }
  }

  const login = (newToken: string, userData: User) => {
    setToken(newToken)
    setUser(userData)
    localStorage.setItem('token', newToken)
    localStorage.setItem('user', JSON.stringify(userData))
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    delete axios.defaults.headers.common['Authorization']
  }

  const value = {
    user,
    token,
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}