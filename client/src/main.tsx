import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

// Register service worker for offline caching
if (import.meta.env.PROD) {
  try {
    import('./utils/serviceWorker').then(({ registerSW }) => {
      registerSW({
        onSuccess: () => console.log('App ready for offline use'),
        onUpdate: () => console.log('New content available'),
        onOfflineReady: () => console.log('App ready to work offline')
      });
    });
  } catch (error) {
    console.log('Service worker registration skipped');
  }
}
