import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Switch, Route } from 'react-router-dom'

import { useAuth } from './context/auth-context'
import { FullPageErrorFallback, AppHeader } from './components'

import { Home } from './screens/home/home'
import { Sheshim } from './screens/sheshim/sheshim'
import { Users } from './screens/users/users'

function AppRoutes() {
  return (
    <Switch>
      <Route path="/sheshim" component={Sheshim} />
      <Route path="/users" component={Users} />
      <Route path="/" component={Home} />
    </Switch>
  )
}

export default function AuthenticatedApp() {
  const { user } = useAuth()
  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <AppHeader />
      <AppRoutes />
    </ErrorBoundary>
  )
}
