import React from 'react'
import styled, { keyframes } from 'styled-components'
import { FaSpinner } from 'react-icons/fa'

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

const Spinner = styled(FaSpinner)`
  animation: ${spin} 1s linear infinite;
`

export function FullPageSpinner() {
  return (
    <div>
      <Spinner />
    </div>
  )
}
