import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Switch, Route } from 'react-router-dom'

import { useAuth } from './context/auth-context'
import { FullPageErrorFallback, AppHeader } from './components'

import { Home } from './screens/home/home'
import { Sheshim } from './screens/sheshim/sheshim'
import { UserList } from './screens/users/user-list/user-list'
import { UserDetails } from './screens/users/user-details/user-details'
import { Profile } from './screens/profile/profile'

export default function AuthenticatedApp() {
  const { user } = useAuth()
  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <AppHeader />
      <Switch>
        <Route exact path="/sheshim" component={Sheshim} />
        <Route exact path="/users" component={UserList} />
        <Route exact path="/users/:id" component={UserDetails} />
        <Route exact path="/profile" component={Profile} />
        <Route path="/" component={Home} />
      </Switch>
    </ErrorBoundary>
  )
}
