import React from 'react'
import styled from 'styled-components'
import { Grid, Button, Icon, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

import { AuthLayout } from 'components'
import { signUpWithEmailAndPassword } from 'services/firebase/auth'

import { SignUpForm, FormValues } from './components/sign-up-form'

const Span = styled.span`
  display: block;
  text-align: center;
  padding-top: 16px;
`

export function SignUp() {
  const onSubmit = (data: FormValues) =>
    signUpWithEmailAndPassword(data)
      .then(() =>
        Swal.fire({
          icon: 'success',
          title: 'You have successfully created your account.',
        }),
      )
      .catch((err) =>
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
          <Button fluid color="google plus">
            <Icon name="google" />
            Sign up with Google
          </Button>
          <Button color="facebook" fluid>
            <Icon name="facebook" />
            Sign up with Facebook
          </Button>
          <Segment raised>
            <SignUpForm onSubmit={onSubmit} />
          </Segment>
          <Span>
            Already have an account? <Link to="/login">Log in</Link>
          </Span>
        </Grid.Column>
      </Grid>
    </AuthLayout>
  )
}
