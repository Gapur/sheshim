import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Grid, Button, Form, Icon, Segment, Image, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { AuthLayout } from 'components'
import { images } from 'assets'

const REGEX_EMAIL = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
const REGEX_PASSWORD = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

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

interface FormValues {
  email: string
  password: string
}

export function LogIn() {
  const { errors, register, handleSubmit, setValue, trigger } = useForm<FormValues>()

  useEffect(() => {
    register('email', { required: 'Email is required', pattern: { value: REGEX_EMAIL, message: 'Email is not valid' } })
    register('password', {
      required: 'Password is required',
      pattern: { value: REGEX_PASSWORD, message: 'Password it not valid' },
    })
  }, [register])

  const onInputChange = async (name: 'email' | 'password', value: string) => {
    setValue(name, value)
    await trigger(name)
  }

  const onSubmit = (data: FormValues) => console.log(data)

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
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Field error={Boolean(errors?.email)}>
                <label>Email</label>
                <input
                  placeholder="example@gmail.com"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange('email', e.target.value)}
                />
                {errors.email && (
                  <Label pointing prompt>
                    {errors.email.message}
                  </Label>
                )}
              </Form.Field>
              <Form.Field error={Boolean(errors?.password)}>
                <label>Password</label>
                <input
                  type="password"
                  placeholder="password"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange('password', e.target.value)}
                />
                {errors.password && (
                  <Label pointing prompt>
                    {errors.password.message}
                  </Label>
                )}
              </Form.Field>
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
