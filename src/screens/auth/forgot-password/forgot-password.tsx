import React from 'react'
import styled from 'styled-components'
import { Grid, Button, Form, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { AuthLayout } from '../../../components'

const Span = styled.span`
  display: block;
  text-align: center;
  padding-top: 16px;
`

export function ForgotPassword() {
  return (
    <AuthLayout>
      <Grid columns={3} centered container stackable>
        <Grid.Column>
          <Segment raised>
            <Form>
              <Form.Field>
                <label>Email</label>
                <input placeholder="example@gmail.com" />
              </Form.Field>
              <Button type="submit" fluid color="twitter">
                Reset
              </Button>
            </Form>
          </Segment>
          <Span>
            Ready to log in? <Link to="/login">Log In</Link>
          </Span>
        </Grid.Column>
      </Grid>
    </AuthLayout>
  )
}
