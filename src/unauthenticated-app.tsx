import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'

import { FullPageErrorFallback } from './components'

import { Login } from './screens/auth/login/login'

function AuthRoutes() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
    </Switch>
  )
}

export default function UnauthenticatedApp() {
  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <AuthRoutes />
    </ErrorBoundary>
  )
}
