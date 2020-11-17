import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Switch, Route } from 'react-router-dom'

import { useAuth } from './context/auth-context'
import { PageErrorFallback, AppHeader, AppFooter } from './components'

import { Home } from './screens/home/home'
import { SheshimList } from './screens/sheshim/sheshim-list/sheshim-list'
import { SheshimDetails } from './screens/sheshim/sheshim-details/sheshim-details'
import { SheshimCreate } from './screens/sheshim/sheshim-create/sheshim-create'
import { UserList } from './screens/users/user-list/user-list'
import { UserDetails } from './screens/users/user-details/user-details'
import { Profile } from './screens/profile/profile'
import { NotFound } from './screens/not-found/not-found'

export default function AuthenticatedApp() {
  const { user } = useAuth()
  return (
    <ErrorBoundary FallbackComponent={PageErrorFallback}>
      <AppHeader />
      <Switch>
        <Route exact path="/sheshim" component={SheshimList} />
        <Route exact path="/sheshim/create" component={SheshimCreate} />
        <Route exact path="/sheshim/:sheshimId" component={SheshimDetails} />
        <Route exact path="/users" component={UserList} />
        <Route exact path="/users/:userId" component={UserDetails} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
      <AppFooter />
    </ErrorBoundary>
  )
}
