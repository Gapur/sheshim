import React, { useState, useEffect } from 'react'
import { Header, Form, TextArea, Select, Button, Image } from 'semantic-ui-react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'

import { AppLayout } from '../../../components'

const DragDropzone = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
`

const PLACEHOLDER_IMAGE = 'https://react.semantic-ui.com/images/wireframe/square-image.png'

interface DropzoneFile extends File {
  preview: string
}

export function UserDetails() {
  const [files, setFiles] = useState<DropzoneFile[]>([])
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) })))
    },
  })

  useEffect(() => {
    files.forEach((file) => URL.revokeObjectURL(file.preview))
  }, [files])

  return (
    <AppLayout page="users">
      <Header>User Details</Header>
      <Form>
        <DragDropzone {...getRootProps({ refKey: 'ref' })}>
          <input {...getInputProps()} />
          <Image src={files.length ? files[0].preview : PLACEHOLDER_IMAGE} size="small" circular />
        </DragDropzone>
        <Form.Group widths="equal">
          <Form.Input fluid id="firstName" label="First name" placeholder="First name" />
          <Form.Input fluid id="lastName" label="Last name" placeholder="Last name" />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input fluid id="email" label="Email" placeholder="example@gmail.com" />
          <Form.Input fluid id="position" label="Position" placeholder="Job Position" />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input fluid id="city" label="City" placeholder="City" />
          <Form.Field
            fluid
            id="country"
            control={Select}
            label={{ children: 'Country', htmlFor: 'form-select-control-country' }}
            placeholder="Country"
            search
            searchInput={{ id: 'form-select-control-country' }}
          />
        </Form.Group>
        <Form.Field
          id="form-textarea-control-opinion"
          control={TextArea}
          label="Description"
          placeholder="Describe something"
        />

        <Button type="submit" color="twitter">
          Save
        </Button>
      </Form>
    </AppLayout>
  )
}
