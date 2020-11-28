import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Grid, Button, Form, Icon, Segment, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { AuthLayout } from 'components'

const REGEX_EMAIL = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
const REGEX_PASSWORD = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

const Span = styled.span`
  display: block;
  text-align: center;
  padding-top: 16px;
`

interface FormValues {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export function SignUp() {
  const { errors, register, handleSubmit, setValue, trigger, watch } = useForm<FormValues>()

  useEffect(() => {
    register('name', { required: 'Name is required' })
    register('email', { required: 'Email is required', pattern: { value: REGEX_EMAIL, message: 'Email is not valid' } })
    register('password', {
      required: 'Password is required',
      pattern: { value: REGEX_PASSWORD, message: 'Password it not valid' },
    })
    register('confirmPassword', {
      validate: (value: string) => value === watch('password') || 'Password don`t match',
    })
  }, [register, watch])

  const onInputChange = async (name: 'name' | 'email' | 'password' | 'confirmPassword', value: string) => {
    setValue(name, value)
    await trigger(name)
  }

  const onSubmit = (data: FormValues) => console.log(data)

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
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Field error={Boolean(errors.name)}>
                <label>Name</label>
                <input
                  placeholder="Name"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange('name', e.target.value)}
                />
                {errors.name && (
                  <Label pointing prompt>
                    {errors.name.message}
                  </Label>
                )}
              </Form.Field>
              <Form.Field error={Boolean(errors.email)}>
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
              <Form.Field error={Boolean(errors.password)}>
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange('password', e.target.value)}
                />
                {errors.password && (
                  <Label pointing prompt>
                    {errors.password.message}
                  </Label>
                )}
              </Form.Field>
              <Form.Field error={Boolean(errors.confirmPassword)}>
                <label>Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onInputChange('confirmPassword', e.target.value)
                  }
                />
                {errors.confirmPassword && (
                  <Label pointing prompt>
                    {errors.confirmPassword.message}
                  </Label>
                )}
              </Form.Field>
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
