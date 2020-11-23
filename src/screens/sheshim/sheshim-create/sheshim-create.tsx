import React, { useState } from 'react'
import { Form, Button, Dropdown, Icon } from 'semantic-ui-react'
import styled from 'styled-components'
import { Blob } from 'react-blob'

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

export function SheshimCreate() {
  const [tags, setTags] = useState<string[]>([])

  const tagOptions = tags.map((tag) => ({ text: tag, value: tag }))

  return (
    <AppLayout page="sheshim">
      <HeaderBlob size="8em">Ask a question</HeaderBlob>
      <ReactBlob size="64vh" animationDuration="60s">
        <Icon name="react" />
      </ReactBlob>
      <Container>
        <Form>
          <Form.Field>
            <label>Title</label>
            <input placeholder="First Name" />
          </Form.Field>
          <TextEditor />
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
      </Container>
    </AppLayout>
  )
}
