import React, { useEffect } from 'react'
import { Button, Form, Label } from 'semantic-ui-react'
import { useForm } from 'react-hook-form'

import { constants } from 'config'

export interface FormValues {
  name: string
  email: string
  password: string
  confirmPassword: string
}

interface SignUpFormProps {
  onSubmit: (formValues: FormValues) => void
}

export function SignUpForm({ onSubmit }: SignUpFormProps) {
  const { errors, formState, register, handleSubmit, setValue, trigger, watch } = useForm<
    FormValues
  >()

  useEffect(() => {
    register('name', { required: 'Name is required' })
    register('email', {
      required: 'Email is required',
      pattern: { value: constants.REGEX.EMAIL, message: 'Email is not valid' },
    })
    register('password', {
      required: 'Password is required',
      pattern: { value: constants.REGEX.PASSWORD, message: 'Password it not valid' },
    })
    register('confirmPassword', {
      validate: (value: string) => value === watch('password') || 'Password don`t match',
    })
  }, [register, watch])

  const onInputChange = async (
    name: 'name' | 'email' | 'password' | 'confirmPassword',
    value: string,
  ) => {
    setValue(name, value)
    await trigger(name)
  }

  return (
    <Form loading={formState.isSubmitting} onSubmit={handleSubmit(onSubmit)}>
      <Form.Field error={Boolean(errors.name)}>
        <label>Name</label>
        <input
          placeholder="Name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onInputChange('name', e.target.value)
          }
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onInputChange('email', e.target.value)
          }
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onInputChange('password', e.target.value)
          }
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
  )
}
