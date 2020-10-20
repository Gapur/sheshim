import React from 'react'

const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time))

const getUser = () => sleep(1000).then(() => 'gapur')

export enum AuthStatus {
  Idle = 'idle',
  Pending = 'pending',
  Error = 'error',
  Success = 'success',
}

export interface AuthContextProps {
  status: AuthStatus
  error: string | null
  user: string | null
}

interface AuthProviderProps {
  children: React.ReactNode
}

const defaultInitialState: AuthContextProps = { status: AuthStatus.Idle, user: null, error: null }

const AuthContext = React.createContext<AuthContextProps>(defaultInitialState)

export function AuthProvider(props: AuthProviderProps) {
  const [state, setState] = React.useState<AuthContextProps>({
    status: AuthStatus.Pending,
    error: null,
    user: null,
  })

  React.useEffect(() => {
    getUser().then(
      (user) => setState({ status: AuthStatus.Success, error: null, user }),
      (error) => setState({ status: AuthStatus.Error, error, user: null }),
    )
  }, [])

  if (state.status === AuthStatus.Idle || state.status === AuthStatus.Pending) {
    return <div>Loading</div>
  }

  if (state.error === AuthStatus.Error) {
    return <div>Oh no</div>
  }

  return <AuthContext.Provider value={state} {...props} />
}

export function useAuthState() {
  const state = React.useContext(AuthContext)
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
