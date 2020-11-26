import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Grid, Button, Form, Segment, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { AuthLayout } from 'components'

const REGEX_EMAIL = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

const Span = styled.span`
  display: block;
  text-align: center;
  padding-top: 16px;
`

interface FormValues {
  email: string
}

export function ForgotPassword() {
  const { errors, register, handleSubmit, setValue, trigger } = useForm<FormValues>()

  useEffect(() => {
    register('email', { required: 'Email is required', pattern: { value: REGEX_EMAIL, message: 'Email is not valid' } })
  }, [register])

  const onInputChange = async (name: 'email', value: string) => {
    setValue(name, value)
    await trigger(name)
  }

  const onSubmit = (data: FormValues) => console.log(data)

  return (
    <AuthLayout>
      <Grid columns={3} centered container stackable>
        <Grid.Column>
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
