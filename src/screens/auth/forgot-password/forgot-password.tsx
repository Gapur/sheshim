import React from 'react'
import styled from 'styled-components'
import { Grid, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

import { AuthLayout } from 'components'
import { firebase, forgotPassword } from 'services/firebase'

import { ForgotPasswordForm, FormValues } from './components/forgot-password-form'

const Span = styled.span`
  display: block;
  text-align: center;
  padding-top: 16px;
`

export function ForgotPassword() {
  const onSubmit = (data: FormValues) =>
    forgotPassword(data).catch((err: firebase.FirebaseError) =>
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
            <ForgotPasswordForm onSubmit={onSubmit} />
          </Segment>
          <Span>
            Ready to log in? <Link to="/login">Log In</Link>
          </Span>
        </Grid.Column>
      </Grid>
    </AuthLayout>
  )
}
