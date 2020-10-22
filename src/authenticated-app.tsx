import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Switch, Route } from 'react-router-dom'

import { useAuth } from './context/auth-context'
import { FullPageErrorFallback } from './components'

import { Home } from './screens/home/home'

function AppRoutes() {
  return (
    <Switch>
      <Route path="/" element={<Home />} />
    </Switch>
  )
}

export default function AuthenticatedApp() {
  const { user } = useAuth()
  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <div>
        {user}
        <button>Logout</button>
      </div>
      <div>
        <AppRoutes />
      </div>
    </ErrorBoundary>
  )
}
