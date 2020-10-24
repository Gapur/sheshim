import React from 'react'
import styled from 'styled-components'
import { Container, Grid, Button, Form, Icon, Segment, Image } from 'semantic-ui-react'

import { images } from '../../../assets'

const Layout = styled.div`
  background: #eff0f1;
`

const LoginButton = styled(Button)`
  && {
    margin-top: 8px;
    margin-bottom: 8px;
  }
`

export function Login() {
  return (
    <Layout>
      <Container>
        <Grid columns={3} centered>
          <Grid.Column>
            <Image src={images.logo} size="tiny" centered />
            <LoginButton basic fluid>
              <Icon name='google' />Log in with Google
            </LoginButton>
            <LoginButton color='facebook' fluid>
              <Icon name='facebook' />Log in with Facebook
            </LoginButton>
            <Segment>
              <Form>
                <Form.Field>
                  <label>Email</label>
                  <input placeholder='email' />
                </Form.Field>
                <Form.Input label='Password' type='password' placeholder="password" />
                <Button type='submit' fluid color="twitter">Log in</Button>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    </Layout>
  )
}
