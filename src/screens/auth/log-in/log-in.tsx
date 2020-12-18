import React from 'react'
import styled from 'styled-components'
import { Grid, Button, Icon, Segment, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

import { AuthLayout } from 'components'
import { images } from 'assets'
import { firebase, loginWithEmailAndPassword, loginWithGoogle } from 'services/firebase'

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
  const onSubmit = (data: FormValues) =>
    loginWithEmailAndPassword(data).catch((err: firebase.FirebaseError) =>
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
      }),
    )

  return (
    <AuthLayout>
      <Grid columns={3} centered container stackable>
        <Grid.Column>
          <Logo src={images.logo} centered />
          <Button fluid color="google plus" onClick={loginWithGoogle}>
            <Icon name="google" />
            Log in with Google
          </Button>
          <Button color="facebook" fluid>
            <Icon name="facebook" />
            Log in with Facebook
          </Button>
          <Segment raised>
            <LogInForm onSubmit={onSubmit} />
          </Segment>
          <Span>
            Don’t have an account? <Link to="/signup">Sign Up</Link>
          </Span>
        </Grid.Column>
      </Grid>
    </AuthLayout>
  )
}
