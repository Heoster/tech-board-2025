import '@testing-library/jest-dom'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import React from 'react'

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup()
})

// Mock axios for tests
vi.mock('axios', () => ({
  default: {
    defaults: {
      baseURL: '',
      headers: {
        common: {}
      }
    },
    get: vi.fn(() => Promise.resolve({ data: {} })),
    post: vi.fn(() => Promise.resolve({ data: {} })),
    put: vi.fn(() => Promise.resolve({ data: {} })),
    delete: vi.fn(() => Promise.resolve({ data: {} }))
  }
}))

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
  useLocation: () => ({
    pathname: '/',
    search: '',
    hash: '',
    state: null,
    key: 'default'
  }),
  Link: ({ children, to, ...props }: { children: React.ReactNode; to: string; [key: string]: unknown }) =>
    React.createElement('a', { href: to, ...props }, children),
  BrowserRouter: ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', {}, children),
  Routes: ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', {}, children),
  Route: ({ element }: { element: React.ReactNode }) =>
    React.createElement('div', {}, element)
}))