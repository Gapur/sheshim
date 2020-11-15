import React, { useState } from 'react'
import { Header, Form, Button, Dropdown } from 'semantic-ui-react'

import { AppLayout, CodeEditor } from 'components'
import { RichText } from 'components/code-editor/rich-text'

export function SheshimCreate() {
  const [tags, setTags] = useState<string[]>([])

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
        <RichText />
        <Form.Field>
          <label>Tags</label>
          <Dropdown
            search
            selection
            multiple
            allowAdditions
            options={tagOptions}
            onChange={(_, { value }) => setTags(value as string[])}
          />
        </Form.Field>
        <Button type="submit" color="twitter">
          Save
        </Button>
      </Form>
    </AppLayout>
  )
}
