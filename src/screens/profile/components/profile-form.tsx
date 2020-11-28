import React, { useEffect, useState } from 'react'
import { Form, Button, Image, Label } from 'semantic-ui-react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'

const DragDropzone = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
`

const PLACEHOLDER_IMAGE = 'https://react.semantic-ui.com/images/wireframe/square-image.png'
const REGEX_EMAIL = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

interface DropzoneFile extends File {
  preview: string
}

interface FormValues {
  firstName: string
  lastName: string
  email: string
  position?: string
  city?: string
  country?: string
  description?: string
}

export function ProfileForm() {
  const [files, setFiles] = useState<DropzoneFile[]>([])
  const { errors, register, handleSubmit, setValue, trigger } = useForm<FormValues>()

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) })))
    },
  })

  useEffect(() => {
    files.forEach((file) => URL.revokeObjectURL(file.preview))
  }, [files])

  useEffect(() => {
    register('firstName', { required: 'First name is required' })
    register('lastName', { required: 'Last name is required' })
    register('email', { required: 'Email is required', pattern: { value: REGEX_EMAIL, message: 'Email is not valid' } })
    register('position')
    register('city')
    register('country')
    register('description')
  }, [register])

  const onInputChange = async (
    name: 'firstName' | 'lastName' | 'email' | 'position' | 'city' | 'country' | 'description',
    value: string,
  ) => {
    setValue(name, value)
    await trigger(name)
  }

  const onSubmit = (data: FormValues) => console.log(data)

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <DragDropzone {...getRootProps({ refKey: 'ref' })}>
        <input {...getInputProps()} />
        <Image src={files.length ? files[0].preview : PLACEHOLDER_IMAGE} size="small" circular />
      </DragDropzone>
      <Form.Group widths="equal">
        <Form.Field error={Boolean(errors.firstName)}>
          <label>First Name</label>
          <input
            placeholder="First name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange('firstName', e.target.value)}
          />
          {errors.firstName && (
            <Label pointing prompt>
              {errors.firstName.message}
            </Label>
          )}
        </Form.Field>
        <Form.Field error={Boolean(errors.lastName)}>
          <label>Last Name</label>
          <input
            placeholder="Last name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange('lastName', e.target.value)}
          />
          {errors.lastName && (
            <Label pointing prompt>
              {errors.lastName.message}
            </Label>
          )}
        </Form.Field>
      </Form.Group>
      <Form.Group widths="equal">
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
        <Form.Field>
          <label>Job Position</label>
          <input
            placeholder="Position"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange('position', e.target.value)}
          />
        </Form.Field>
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Field>
          <label>City</label>
          <input
            placeholder="City"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange('city', e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Country</label>
          <input
            placeholder="Kazakhstan"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange('country', e.target.value)}
          />
        </Form.Field>
      </Form.Group>
      <Form.Field>
        <label>Description</label>
        <textarea
          rows={3}
          placeholder="Describe something about yourself"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onInputChange('description', e.target.value)}
        />
      </Form.Field>

      <Button type="submit" color="twitter">
        Save
      </Button>
    </Form>
  )
}
