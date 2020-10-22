import React from 'react'
import { FallbackProps } from 'react-error-boundary'

export function FullPageErrorFallback({ error }: FallbackProps) {
  return (
    <div role="alert">
      <p>Uh oh... There's a problem. Try refreshing the app.</p>
      <pre>{error?.message}</pre>
    </div>
  )
}
