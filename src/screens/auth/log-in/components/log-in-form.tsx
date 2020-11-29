import React, { useEffect } from 'react'
import { Button, Form, Label } from 'semantic-ui-react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export interface FormValues {
  email: string
  password: string
}

interface LogInFormProps {
  onSubmit: (formValues: FormValues) => void
}

const REGEX_EMAIL = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
const REGEX_PASSWORD = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

const FormFieldEnd = styled(Form.Field)`
  display: flex;
  justify-content: flex-end;
`

export function LogInForm({ onSubmit }: LogInFormProps) {
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

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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
  )
}
