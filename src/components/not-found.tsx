import React from 'react'
import { Image, Header, Button } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { images } from 'assets'
import { metrics } from 'theme'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - ${metrics.footer_height});

  .image {
    width: 300px;
  }

  strong {
    margin-bottom: 24px;
  }
`

export function NotFound() {
  const history = useHistory()

  return (
    <Container>
      <Image src={images.setTheSails} />
      <Header as="h2">Page not found</Header>
      <strong>Sorry, this page is not here.</strong>
      <Button positive onClick={() => history.push('/')}>
        Go To Home
      </Button>
    </Container>
  )
}
