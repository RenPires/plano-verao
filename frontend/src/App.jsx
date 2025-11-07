import React from 'react'
import Dashboard from './components/Dashboard'
import ErrorBoundary from './components/ErrorBoundary'
import { ThemeProvider } from './contexts/ThemeContext'
import './styles/index.css'

function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <div className="min-h-screen bg-gradient-to-br from-summer-50 via-sand-50 to-ocean-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-700">
          <Dashboard />
        </div>
      </ErrorBoundary>
    </ThemeProvider>
  )
}

export default App