import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'

import { FullPageErrorFallback } from './components'

import { Login } from './screens/auth/login/login'
import { Signup } from './screens/auth/signup/signup'

function AuthRoutes() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
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
