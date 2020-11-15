import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'

interface BaseProps {
  [key: string]: unknown
}

const StyledMenu = styled.div`
  & > * {
    display: inline-block;
  }
  & > * + * {
    margin-left: 15px;
  }
`

export function Menu({ className, ...props }: PropsWithChildren<BaseProps>) {
  return <StyledMenu {...props} />
}

const StyledToolbar = styled(Menu)`
  position: relative;
  padding: 1px 18px 17px;
  margin: 0 -20px;
  border-bottom: 2px solid #eee;
  margin-bottom: 20px;
`

export function Toolbar(props: PropsWithChildren<BaseProps>) {
  return <StyledToolbar {...props} />
}
