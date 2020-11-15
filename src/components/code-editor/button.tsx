import React from 'react'
import styled from 'styled-components'

interface BaseProps {
  [key: string]: unknown
}

interface PropsWithChildren {
  active?: boolean
  reversed?: boolean
}

const StyledButton = styled.span<PropsWithChildren>`
  cursor: pointer;
  color: ${(props) => (props.reversed ? (props.active ? 'white' : '#aaa') : props.active ? 'black' : '#ccc')};
`

export function Button(props: PropsWithChildren & BaseProps) {
  return <StyledButton {...props} />
}
