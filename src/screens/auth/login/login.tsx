import React from 'react'
import styled from 'styled-components'
import { Grid, Button, Form, Icon, Segment, Image } from 'semantic-ui-react'

import { images } from '../../../assets'

const AuthLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f6f7f9;
`

const LoginButton = styled(Button)`
  && {
    margin-top: 8px;
    margin-bottom: 8px;
  }
`

const Logo = styled(Image)`
  width: 72px;
  margin-bottom: 32px;
`

export function Login() {
  return (
    <AuthLayout>
      <Grid columns={3} centered container stackable>
        <Grid.Column>
          <Logo src={images.logo} centered />
          <LoginButton basic fluid>
            <Icon name="google" />
            Log in with Google
          </LoginButton>
          <LoginButton color="facebook" fluid>
            <Icon name="facebook" />
            Log in with Facebook
          </LoginButton>
          <Segment>
            <Form>
              <Form.Field>
                <label>Email</label>
                <input placeholder="email" />
              </Form.Field>
              <Form.Input label="Password" type="password" placeholder="password" />
              <Button type="submit" fluid color="twitter">
                Log in
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    </AuthLayout>
  )
}
