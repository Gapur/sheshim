import React, { useState } from 'react'
import { Header, Form, Button } from 'semantic-ui-react'
import { Node as SlateNode } from 'slate'

import { TextEditor } from 'components'

interface SheshimAnswerFormProps {
  onSubmit: (value: SlateNode[]) => void
}

export function SheshimAnswerForm({ onSubmit }: SheshimAnswerFormProps) {
  const [sheshimAnswer, setSheshimAnswer] = useState<SlateNode[]>()

  const onSave = () => {
    if (sheshimAnswer) {
      onSubmit(sheshimAnswer)
    }
  }

  return (
    <Form>
      <Header>Your Answer</Header>

      <TextEditor value={sheshimAnswer} onChange={setSheshimAnswer} />

      <Button color="twitter" floated="right" onClick={onSave}>
        Post Your Answer
      </Button>
    </Form>
  )
}
