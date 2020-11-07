import React, { useState } from 'react'
import { Header, Form, Button, Dropdown, DropdownProps } from 'semantic-ui-react'

import { AppLayout, CodeEditor } from 'components'

export function SheshimCreate() {
  const [tags, setTags] = useState<string[]>([])

  const onTagAddition = (event: React.KeyboardEvent<HTMLElement>, data: DropdownProps) =>
    setTags((prevTags) => prevTags.concat(data.value as string))

  const tagOptions = tags.map((tag) => ({ text: tag, value: tag }))

  return (
    <AppLayout page="sheshim">
      <Header>Ask a public question</Header>
      <Form>
        <Form.Field>
          <label>Title</label>
          <input placeholder="First Name" />
        </Form.Field>
        {/* <CodeEditor /> */}
        <Form.Field>
          <label>Tags</label>
          <Dropdown search selection multiple allowAdditions onAddItem={onTagAddition} options={tagOptions} />
        </Form.Field>
        <Button type="submit" color="twitter">
          Save
        </Button>
      </Form>
    </AppLayout>
  )
}
