import React, { useEffect, useState } from 'react'
import { Form, Button, Label } from 'semantic-ui-react'
import { useForm } from 'react-hook-form'

import { DragDropzone, DropzoneFile } from './drag-dropzone'
import { constants } from 'config'
import { User } from 'models'

export interface FormValues {
  name: string
  email?: string
  position?: string
  city?: string
  country?: string
  description?: string
}

interface ProfileFormProps {
  profile: User
  onSubmit: (data: FormValues) => void
}

export function ProfileForm({ profile, onSubmit }: ProfileFormProps) {
  const [files, setFiles] = useState<DropzoneFile[]>([])

  const defaultValues: FormValues = {
    name: profile.name as string,
    email: profile.email,
    position: profile.position,
    city: profile.city,
    country: profile.country,
    description: profile.description,
  }

  const { errors, register, handleSubmit, setValue, trigger } = useForm<FormValues>({
    defaultValues,
  })

  useEffect(() => {
    files.forEach((file) => URL.revokeObjectURL(file.preview))
  }, [files])

  useEffect(() => {
    register('name', { required: 'Name is required' })
    register('email', {
      required: 'Email is required',
      pattern: { value: constants.REGEX.EMAIL, message: 'Email is not valid' },
    })
    register('position')
    register('city')
    register('country')
    register('description')
  }, [register])

  const onInputChange = async (
    name: 'name' | 'email' | 'position' | 'city' | 'country' | 'description',
    value: string,
  ) => {
    setValue(name, value)
    await trigger(name)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <DragDropzone files={files} onChange={setFiles} />

      <Form.Field error={Boolean(errors.name)}>
        <label>Name</label>
        <input
          defaultValue={defaultValues.name}
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

      <Form.Group widths="equal">
        <Form.Field error={Boolean(errors.email)}>
          <label>Email</label>
          <input
            defaultValue={defaultValues.email}
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
        <Form.Field>
          <label>Job Position</label>
          <input
            defaultValue={defaultValues.position}
            placeholder="Position"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onInputChange('position', e.target.value)
            }
          />
        </Form.Field>
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Field>
          <label>City</label>
          <input
            defaultValue={defaultValues.city}
            placeholder="City"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onInputChange('city', e.target.value)
            }
          />
        </Form.Field>
        <Form.Field>
          <label>Country</label>
          <input
            defaultValue={defaultValues.country}
            placeholder="Kazakhstan"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onInputChange('country', e.target.value)
            }
          />
        </Form.Field>
      </Form.Group>
      <Form.Field>
        <label>Description</label>
        <textarea
          rows={3}
          defaultValue={defaultValues.description}
          placeholder="Describe something about yourself"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            onInputChange('description', e.target.value)
          }
        />
      </Form.Field>

      <Button type="submit" color="twitter">
        Save
      </Button>
    </Form>
  )
}
