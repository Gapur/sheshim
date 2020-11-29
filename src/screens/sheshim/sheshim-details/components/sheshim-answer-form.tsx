import React from 'react'
import { Header, Form, Button } from 'semantic-ui-react'

import { TextEditor } from 'components'

export function SheshimAnswerForm() {
  return (
    <Form>
      <Header>Your Answer</Header>

      <TextEditor />

      <Button color="twitter" floated="right">
        Post Your Answer
      </Button>
    </Form>
  )
}
