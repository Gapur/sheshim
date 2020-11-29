import React, { useEffect } from 'react'
import { Button, Form, Label } from 'semantic-ui-react'
import { useForm } from 'react-hook-form'

const REGEX_EMAIL = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

export interface FormValues {
  email: string
}

interface ForgotPasswordFormProps {
  onSubmit: (formValues: FormValues) => void
}

export function ForgotPasswordForm({ onSubmit }: ForgotPasswordFormProps) {
  const { errors, register, handleSubmit, setValue, trigger } = useForm<FormValues>()

  useEffect(() => {
    register('email', { required: 'Email is required', pattern: { value: REGEX_EMAIL, message: 'Email is not valid' } })
  }, [register])

  const onInputChange = async (name: 'email', value: string) => {
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

      <Button type="submit" fluid color="twitter">
        Reset
      </Button>
    </Form>
  )
}
