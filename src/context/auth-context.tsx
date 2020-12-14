import React, { useEffect, useState, useContext, createContext } from 'react'

import { PageLoader } from 'components'
import { firebase, onAuthStateChanged } from 'services/firebase'

export enum AuthStatus {
  Idle = 'idle',
  Pending = 'pending',
  Error = 'error',
  Success = 'success',
}

export interface AuthContextProps {
  status: AuthStatus
  error: string | null
  user: firebase.UserInfo | null
}

interface AuthProviderProps {
  children: React.ReactNode
}

const defaultInitialState: AuthContextProps = { status: AuthStatus.Idle, user: null, error: null }

const AuthContext = createContext<AuthContextProps>(defaultInitialState)

export function AuthProvider(props: AuthProviderProps) {
  const [state, setState] = useState<AuthContextProps>({
    status: AuthStatus.Pending,
    error: null,
    user: null,
  })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      (user: firebase.User) => {
        setState({ status: AuthStatus.Success, error: null, user })
      },
      () => setState({ status: AuthStatus.Error, error: 'No user is signed in.', user: null }),
    )

    return () => unsubscribe()
  }, [])

  if (state.status === AuthStatus.Idle || state.status === AuthStatus.Pending) {
    return <PageLoader />
  }

  if (state.error === AuthStatus.Error) {
    return <div>Oh no</div>
  }

  return <AuthContext.Provider value={state} {...props} />
}

export function useAuth() {
  const state = useContext(AuthContext)
  const isIdle = state.status === AuthStatus.Idle
  const isPending = state.status === AuthStatus.Pending
  const isError = state.status === AuthStatus.Error
  const isSuccess = state.status === AuthStatus.Success
  const isAuthenticated = state.user && isSuccess
  return {
    ...state,
    isIdle,
    isPending,
    isError,
    isSuccess,
    isAuthenticated,
  }
}
