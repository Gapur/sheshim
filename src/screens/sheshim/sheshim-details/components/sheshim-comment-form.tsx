import React, { useEffect, useState } from 'react'
import { Button, Form, Label } from 'semantic-ui-react'
import { useForm } from 'react-hook-form'

interface FormValues {
  comment: string
}

export function SheshimCommentForm() {
  const { errors, register, handleSubmit, setValue, trigger, reset } = useForm<FormValues>()
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    register('comment', { required: 'Comment is required' })
  }, [register])

  const onInputChange = async (name: 'comment', value: string) => {
    setValue(name, value)
    await trigger(name)
  }

  const onSubmit = (data: FormValues) => console.log(data)

  const onCancel = () => {
    reset()
    setShowForm(false)
  }

  if (!showForm) {
    return (
      <Button basic size="mini" onClick={() => setShowForm(true)}>
        Add a comment
      </Button>
    )
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Field error={Boolean(errors.comment)}>
        <textarea
          rows={3}
          placeholder="Use comments to ask for more information or suggest improvements"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onInputChange('comment', e.target.value)}
        />
        {errors.comment && (
          <Label pointing prompt>
            {errors.comment.message}
          </Label>
        )}
      </Form.Field>
      <Button type="submit" color="twitter" floated="right">
        Save
      </Button>
      <Button floated="right" onClick={onCancel}>
        Cancel
      </Button>
    </Form>
  )
}
