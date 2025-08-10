import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'
import { BrowserRouter } from 'react-router-dom'
import LoginForm from '../LoginForm'
import { AuthProvider } from '../../../contexts/AuthContext'

// Mock axios
vi.mock('axios')
const mockedAxios = vi.mocked(axios, true)

// Mock react-router-dom
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <AuthProvider>
      {children}
    </AuthProvider>
  </BrowserRouter>
)

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockNavigate.mockClear()
  })

  it('renders login form with all required fields', () => {
    render(<LoginForm />, { wrapper: TestWrapper })

    expect(screen.getByText('Student Login')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Roll Number')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Select Grade')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Select Section')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('shows validation errors for empty fields', async () => {
    const user = userEvent.setup()
    render(<LoginForm />, { wrapper: TestWrapper })

    const submitButton = screen.getByRole('button', { name: /sign in/i })
    await user.click(submitButton)

    // HTML5 validation should prevent submission
    const rollNumberField = screen.getByPlaceholderText('Roll Number')
    expect(rollNumberField).toBeRequired()
  })

  it('updates form fields when user types', async () => {
    const user = userEvent.setup()
    render(<LoginForm />, { wrapper: TestWrapper })

    const rollNumberField = screen.getByPlaceholderText('Roll Number')
    const passwordField = screen.getByPlaceholderText('Password')

    await user.type(rollNumberField, '12')
    await user.type(passwordField, 'testpass')

    expect(rollNumberField).toHaveValue('12')
    expect(passwordField).toHaveValue('testpass')
  })

  it('handles successful login', async () => {
    const user = userEvent.setup()
    const mockResponse = {
      data: {
        data: {
          token: 'mock-token',
          student: {
            id: 1,
            name: 'Test Student',
            rollNumber: 12,
            grade: 9,
            section: 'A'
          }
        }
      }
    }

    mockedAxios.post.mockResolvedValueOnce(mockResponse)

    render(<LoginForm />, { wrapper: TestWrapper })

    // Fill form
    await user.type(screen.getByPlaceholderText('Roll Number'), '12')
    const gradeSelect = screen.getByDisplayValue('Select Grade')
    const sectionSelect = screen.getByDisplayValue('Select Section')
    await user.selectOptions(gradeSelect, '9')
    await user.selectOptions(sectionSelect, 'A')
    await user.type(screen.getByPlaceholderText('Password'), 'testpass')

    // Submit form
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith('auth/login', {
        rollNumber: '12',
        grade: '9',
        section: 'A',
        password: 'testpass'
      })
    })

    // Should navigate to dashboard
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard')
    })
  })

  it('handles login error', async () => {
    const user = userEvent.setup()
    const mockError = {
      response: {
        data: {
          error: {
            message: 'Invalid credentials'
          }
        }
      }
    }

    mockedAxios.post.mockRejectedValueOnce(mockError)

    render(<LoginForm />, { wrapper: TestWrapper })

    // Fill form
    await user.type(screen.getByPlaceholderText('Roll Number'), '12')
    const gradeSelect = screen.getByDisplayValue('Select Grade')
    const sectionSelect = screen.getByDisplayValue('Select Section')
    await user.selectOptions(gradeSelect, '9')
    await user.selectOptions(sectionSelect, 'A')
    await user.type(screen.getByPlaceholderText('Password'), 'wrongpass')

    // Submit form
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument()
    })
  })

  it('shows loading state during submission', async () => {
    const user = userEvent.setup()
    
    // Mock a delayed response
    mockedAxios.post.mockImplementation(() => 
      new Promise(resolve => setTimeout(resolve, 100))
    )

    render(<LoginForm />, { wrapper: TestWrapper })

    // Fill form
    await user.type(screen.getByPlaceholderText('Roll Number'), '12')
    const gradeSelect = screen.getByDisplayValue('Select Grade')
    const sectionSelect = screen.getByDisplayValue('Select Section')
    await user.selectOptions(gradeSelect, '9')
    await user.selectOptions(sectionSelect, 'A')
    await user.type(screen.getByPlaceholderText('Password'), 'testpass')

    // Submit form
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    // Should show loading state
    expect(screen.getByText('Signing in...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /signing in/i })).toBeDisabled()
  })

  it('has links to registration and admin login', () => {
    render(<LoginForm />, { wrapper: TestWrapper })

    expect(screen.getByText('register for a new account')).toBeInTheDocument()
    expect(screen.getByText('Admin Login')).toBeInTheDocument()
  })
})