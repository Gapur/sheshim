import React from 'react'
import { FallbackProps } from 'react-error-boundary'
import { Image, Header } from 'semantic-ui-react'
import styled from 'styled-components'

import { images } from 'assets'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 72%;
  margin: 0 auto;

  .image {
    width: 400px;
  }

  pre {
    white-space: pre-wrap;
  }
`

export function PageErrorFallback({ error }: FallbackProps) {
  return (
    <Container>
      <Image src={images.setTheSails} />
      <Header>Ooops... Something went wrong. Try refreshing the page.</Header>
      <pre>{error?.message}</pre>
    </Container>
  )
}
