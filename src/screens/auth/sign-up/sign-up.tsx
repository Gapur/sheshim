import React from 'react'
import styled from 'styled-components'
import { Grid, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

import { AuthLayout } from 'components'
import { firebase, signUpWithEmailAndPassword } from 'services/firebase'

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
      .catch((err: firebase.FirebaseError) =>
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
