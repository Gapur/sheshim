import React, { useState } from 'react'
import { Header, Form, Button } from 'semantic-ui-react'
import { Node as SlateNode } from 'slate'
import Swal, { SweetAlertResult } from 'sweetalert2'

import { TextEditor, INITIAL_EDITOR_VALUE } from 'components'

interface SheshimAnswerFormProps {
  onSubmit: (value: SlateNode[]) => Promise<void | SweetAlertResult>
}

export function SheshimAnswerForm({ onSubmit }: SheshimAnswerFormProps) {
  const [sheshimAnswer, setSheshimAnswer] = useState<SlateNode[]>()

  const onSave = () => {
    const hasText = sheshimAnswer?.some((answer: SlateNode) =>
      (answer.children as { text: string }[]).some((value) => !String(value.text).trim()),
    )
    if (sheshimAnswer && !hasText) {
      onSubmit(sheshimAnswer).then(() => setSheshimAnswer(INITIAL_EDITOR_VALUE))
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Your answer couldn't be submitted. Because your response body is missing.",
      })
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
