import React from 'react'

import { useAuth } from './context/auth-context'
import { FullPageSpinner } from './components'

const AuthenticatedApp = React.lazy(() => import('./authenticated-app'))
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'))

export function App() {
  const { user } = useAuth()
  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {!user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  )
}
