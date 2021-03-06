import React from 'react'
import styled from 'styled-components'
import { Grid, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

import { AuthLayout } from 'components'
import { forgotPassword } from 'services/firebase'
import { fireSwalError } from 'utils/error-handler'

import { ForgotPasswordForm, FormValues } from './components/forgot-password-form'

const Span = styled.span`
  display: block;
  text-align: center;
  padding-top: 16px;
`

export function ForgotPassword() {
  const onSubmit = (data: FormValues) =>
    forgotPassword(data)
      .then(() =>
        Swal.fire({
          icon: 'success',
          text:
            'If the email you have entered exists in our system, we will send a link to reset your password.',
        }),
      )
      .catch(fireSwalError)

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
