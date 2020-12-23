import React from 'react'
import styled from 'styled-components'
import { Grid, Button, Icon, Segment, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { AuthLayout } from 'components'
import { images } from 'assets'
import { loginWithEmailAndPassword, loginWithGoogle, loginWithFacebook } from 'services/firebase'
import { fireSwalError } from 'utils/error-handler'

import { LogInForm, FormValues } from './components/log-in-form'

const Logo = styled(Image)`
  width: 72px;
  margin-bottom: 32px;
`

const Span = styled.span`
  display: block;
  text-align: center;
  padding-top: 16px;
`

export function LogIn() {
  const onLoginWithEmailAndPassword = (data: FormValues) =>
    loginWithEmailAndPassword(data).catch(fireSwalError)

  const onLoginWithGoogle = () => loginWithGoogle().catch(fireSwalError)

  const onLoginWithFacebook = () => loginWithFacebook().catch(fireSwalError)

  return (
    <AuthLayout>
      <Grid columns={3} centered container stackable>
        <Grid.Column>
          <Logo src={images.logo} centered />
          <Button fluid color="google plus" onClick={onLoginWithGoogle}>
            <Icon name="google" />
            Log in with Google
          </Button>
          <Button color="facebook" fluid onClick={onLoginWithFacebook}>
            <Icon name="facebook" />
            Log in with Facebook
          </Button>
          <Segment raised>
            <LogInForm onSubmit={onLoginWithEmailAndPassword} />
          </Segment>
          <Span>
            Don’t have an account? <Link to="/signup">Sign Up</Link>
          </Span>
        </Grid.Column>
      </Grid>
    </AuthLayout>
  )
}
