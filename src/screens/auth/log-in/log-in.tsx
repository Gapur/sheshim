import React from 'react'
import styled from 'styled-components'
import { Grid, Button, Form, Icon, Segment, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { AuthLayout } from 'components'
import { images } from 'assets'

const Logo = styled(Image)`
  width: 72px;
  margin-bottom: 32px;
`

const Span = styled.span`
  display: block;
  text-align: center;
  padding-top: 16px;
`

const FormFieldEnd = styled(Form.Field)`
  display: flex;
  justify-content: flex-end;
`

export function LogIn() {
  return (
    <AuthLayout>
      <Grid columns={3} centered container stackable>
        <Grid.Column>
          <Logo src={images.logo} centered />
          <Button fluid color="google plus">
            <Icon name="google" />
            Log in with Google
          </Button>
          <Button color="facebook" fluid>
            <Icon name="facebook" />
            Log in with Facebook
          </Button>
          <Segment raised>
            <Form>
              <Form.Field>
                <label>Email</label>
                <input placeholder="example@gmail.com" />
              </Form.Field>
              <Form.Input label="Password" type="password" placeholder="password" />
              <FormFieldEnd>
                <Link to="/forgot">Forgot password?</Link>
              </FormFieldEnd>
              <Button type="submit" fluid color="twitter">
                Log in
              </Button>
            </Form>
          </Segment>
          <Span>
            Don’t have an account? <Link to="/signup">Sign Up</Link>
          </Span>
        </Grid.Column>
      </Grid>
    </AuthLayout>
  )
}
