import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { registerSW } from './utils/serviceWorker'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <App />
    </BrowserRouter>
  </StrictMode>,
)

// Register service worker for offline caching
if (import.meta.env.PROD) {
  registerSW({
    onSuccess: () => {
      console.log('App is ready for offline use');
    },
    onUpdate: () => {
      console.log('New content available, please refresh');
      // You could show a toast notification here
    },
    onOfflineReady: () => {
      console.log('App is ready to work offline');
    }
  });
}
