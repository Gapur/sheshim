import React from 'react'
import styled from 'styled-components'
import { Grid, Button, Form, Icon, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { AuthLayout } from '../../../components'

const Span = styled.span`
  display: block;
  text-align: center;
  padding-top: 16px;
`

export function SignUp() {
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
            <Form>
              <Form.Field>
                <label>Name</label>
                <input placeholder="name" />
              </Form.Field>
              <Form.Field>
                <label>Email</label>
                <input placeholder="example@gmail.com" />
              </Form.Field>
              <Form.Input label="Password" type="password" placeholder="password" />
              <Form.Input label="Confirm Password" type="password" placeholder="confirm password" />
              <Button type="submit" fluid color="twitter">
                Sign up
              </Button>
            </Form>
          </Segment>
          <Span>
            Already have an account? <Link to="/login">Log in</Link>
          </Span>
        </Grid.Column>
      </Grid>
    </AuthLayout>
  )
}
