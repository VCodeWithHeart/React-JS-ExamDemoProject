import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SnackbarProvider } from 'notistack'
import AuthProvider from './provider/AuthProvider.jsx'
// import { ErrorBoundary } from 'react-error-boundary'
// import ErrorPage from './presentation/ErrorPage.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
      <AuthProvider>
        <SnackbarProvider autoHideDuration={2000} maxSnack={3}>
          <App />
        </SnackbarProvider>
      </AuthProvider>
  // </StrictMode>
)
