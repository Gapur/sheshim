import React, { useEffect } from 'react'
import { Form, Button, Icon, Dropdown, DropdownProps, Label } from 'semantic-ui-react'
import styled from 'styled-components'
import { Blob } from 'react-blob'
import { useForm, NestedValue } from 'react-hook-form'
import { Node as SlateNode } from 'slate'

import { AppLayout, TextEditor } from 'components'
import { colors } from 'theme'

const Container = styled.div`
  width: 72%;
`

const HeaderBlob = styled(Blob)`
  font-size: 1.5em;
  background-color: ${colors.lightSkyBlue};
  color: ${colors.white};
`

const ReactBlob = styled(Blob)`
  position: absolute;
  top: -4%;
  right: -8%;
  background-color: ${colors.lightSkyBlue};
  color: ${colors.white};
  opacity: 0.8;
  font-size: 32vh;

  .react.icon {
    height: auto;
  }
`

interface FormValues {
  title: string
  tags: NestedValue<string[]>
  body: SlateNode[]
}

export function SheshimCreate() {
  const { errors, register, handleSubmit, setValue, trigger } = useForm<FormValues>()
  const onSubmit = (data: unknown) => console.log(data)

  console.log(errors)

  useEffect(() => {
    register('title', { required: 'Title is required' })
    register('tags', { validate: (value) => value?.length || 'Tags are required' })
  }, [register])

  const onInputChange = async (name: string, value: string) => {
    setValue(name, value)
    await trigger(name)
  }

  const onSelectChange = async ({ name, value }: DropdownProps) => {
    setValue(name, value)
    await trigger(name)
  }

  return (
    <AppLayout page="sheshim">
      <HeaderBlob size="8em">Ask a question</HeaderBlob>
      <ReactBlob size="64vh" animationDuration="60s">
        <Icon name="react" />
      </ReactBlob>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Field error={errors?.title ?? false}>
            <label>Title</label>
            <input
              placeholder="Title"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange('title', e.target.value)}
            />
            {errors.title && (
              <Label pointing prompt>
                {errors.title.message}
              </Label>
            )}
          </Form.Field>
          <TextEditor />
          <Form.Field error={errors?.tags ?? false}>
            <label>Tags</label>
            <Dropdown
              label="Tags"
              search
              selection
              multiple
              allowAdditions
              options={[]}
              onChange={(_, data: DropdownProps) => onSelectChange({ name: 'tags', ...data })}
            />
            {errors.tags && (
              <Label pointing prompt>
                {errors.tags.message}
              </Label>
            )}
          </Form.Field>
          <Button type="submit" color="twitter">
            Save
          </Button>
        </Form>
      </Container>
    </AppLayout>
  )
}
