import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'

import { FullPageErrorFallback } from './components'

import { LogIn } from './screens/auth/log-in/log-in'
import { SignUp } from './screens/auth/sign-up/sign-up'
import { ForgotPassword } from './screens/auth/forgot-password/forgot-password'

export default function UnauthenticatedApp() {
  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <Switch>
        <Route path="/login" component={LogIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/forgot" component={ForgotPassword} />
        <Redirect to="/login" />
      </Switch>
    </ErrorBoundary>
  )
}
