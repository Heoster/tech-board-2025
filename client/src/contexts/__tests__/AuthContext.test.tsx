import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor, act } from '@testing-library/react'
import { AuthProvider, useAuth } from '../AuthContext'
import axios from 'axios'

// Mock axios
vi.mock('axios')
const mockedAxios = vi.mocked(axios, true)

// Test component that uses AuthContext
const TestComponent = () => {
  const { user, token, login, logout, loading } = useAuth()
  
  return (
    <div>
      <div data-testid="loading">{loading ? 'loading' : 'not loading'}</div>
      <div data-testid="user">{user ? JSON.stringify(user) : 'no user'}</div>
      <div data-testid="token">{token || 'no token'}</div>
      <button 
        onClick={() => login('test-token', { id: 1, role: 'student' })}
        data-testid="login-btn"
      >
        Login
      </button>
      <button onClick={logout} data-testid="logout-btn">
        Logout
      </button>
    </div>
  )
}

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Clear localStorage
    localStorage.clear()
  })

  it('provides initial auth state', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    expect(screen.getByTestId('loading')).toHaveTextContent('not loading')
    expect(screen.getByTestId('user')).toHaveTextContent('no user')
    expect(screen.getByTestId('token')).toHaveTextContent('no token')
  })

  it('handles login correctly', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    const loginBtn = screen.getByTestId('login-btn')
    
    await act(async () => {
      loginBtn.click()
    })

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('{"id":1,"role":"student"}')
      expect(screen.getByTestId('token')).toHaveTextContent('test-token')
    })

    // Check localStorage
    expect(localStorage.getItem('token')).toBe('test-token')
    expect(localStorage.getItem('user')).toBe('{"id":1,"role":"student"}')
  })

  it('handles logout correctly', async () => {
    // Set initial state
    localStorage.setItem('token', 'existing-token')
    localStorage.setItem('user', '{"id":1,"role":"student"}')

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    // Should load from localStorage
    await waitFor(() => {
      expect(screen.getByTestId('token')).toHaveTextContent('existing-token')
    })

    const logoutBtn = screen.getByTestId('logout-btn')
    
    await act(async () => {
      logoutBtn.click()
    })

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('no user')
      expect(screen.getByTestId('token')).toHaveTextContent('no token')
    })

    // Check localStorage cleared
    expect(localStorage.getItem('token')).toBeNull()
    expect(localStorage.getItem('user')).toBeNull()
  })

  it('loads auth state from localStorage on initialization', async () => {
    const testUser = { id: 1, role: 'student', name: 'Test User' }
    localStorage.setItem('token', 'stored-token')
    localStorage.setItem('user', JSON.stringify(testUser))

    mockedAxios.get.mockResolvedValueOnce({ data: { success: true } })

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('token')).toHaveTextContent('stored-token')
      expect(screen.getByTestId('user')).toHaveTextContent(JSON.stringify(testUser))
    })

    // Should verify token
    expect(mockedAxios.get).toHaveBeenCalledWith('auth/verify', {
      headers: { Authorization: 'Bearer stored-token' }
    })
  })

  it('handles token verification failure', async () => {
    localStorage.setItem('token', 'invalid-token')
    localStorage.setItem('user', '{"id":1,"role":"student"}')

    mockedAxios.get.mockRejectedValueOnce(new Error('Token invalid'))

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('no user')
      expect(screen.getByTestId('token')).toHaveTextContent('no token')
    })

    // Should clear invalid data
    expect(localStorage.getItem('token')).toBeNull()
    expect(localStorage.getItem('user')).toBeNull()
  })

  it('sets axios defaults correctly', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    const loginBtn = screen.getByTestId('login-btn')
    
    await act(async () => {
      loginBtn.click()
    })

    // Check that axios defaults are set
    expect(mockedAxios.defaults.headers.common['Authorization']).toBe('Bearer test-token')
  })

  it('throws error when useAuth is used outside AuthProvider', () => {
    // Suppress console error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    expect(() => {
      render(<TestComponent />)
    }).toThrow('useAuth must be used within an AuthProvider')
    
    consoleSpy.mockRestore()
  })
})