import React, { useEffect } from 'react'
import { Form, Button, Dropdown, DropdownProps, Label } from 'semantic-ui-react'
import { useForm, NestedValue } from 'react-hook-form'
import { Node as SlateNode } from 'slate'

import { TextEditor } from 'components'

export interface FormValues {
  title: string
  tags: NestedValue<string[]>
  body: SlateNode[]
}

interface SheshimFormProps {
  onSubmit: (formValues: FormValues) => void
}

export function SheshimForm({ onSubmit }: SheshimFormProps) {
  const { errors, register, handleSubmit, setValue, trigger, watch } = useForm<FormValues>()

  useEffect(() => {
    register('title', { required: 'Title is required' })
    register('body')
    register('tags', { validate: (value) => value?.length || 'Tags are required' })
  }, [register])

  const onInputChange = async (name: string, value: string | SlateNode[]) => {
    setValue(name, value)
    await trigger(name)
  }

  const onSelectChange = async ({ name, value }: DropdownProps) => {
    setValue(name, value)
    await trigger(name)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Field error={Boolean(errors.title)}>
        <label>Title</label>
        <input
          placeholder="Title"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onInputChange('title', e.target.value)
          }
        />
        {errors.title && (
          <Label pointing prompt>
            {errors.title.message}
          </Label>
        )}
      </Form.Field>

      <TextEditor
        value={watch('body')}
        onChange={(value: SlateNode[]) => onInputChange('body', value)}
      />

      <Form.Field error={Boolean(errors.tags)}>
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
  )
}
