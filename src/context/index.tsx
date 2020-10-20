import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { AuthProvider } from './auth-context'

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter>
      <AuthProvider>{children}</AuthProvider>
    </BrowserRouter>
  )
}
