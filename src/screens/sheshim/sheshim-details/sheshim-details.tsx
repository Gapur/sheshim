import React from 'react'
import { Header, Label, Divider, Button } from 'semantic-ui-react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { AppLayout } from '../../../components'
import { CodeEditor } from './components/code-editor'
import { data } from '../../home/mock'

interface SheshimDetailsParams {
  sheshimId: string
}

const Sheshimder = styled.div`
  width: 72%;
`

const SheshimResponse = styled.div`
  display: flex;
`

export function SheshimDetails() {
  const { sheshimId } = useParams<SheshimDetailsParams>()

  const sheshim = data.find((item) => String(item.id) === sheshimId)

  if (!sheshim) {
    return <div>Loading</div>
  }

  return (
    <AppLayout page="sheshim">
      <Header>
        {sheshim.title}
        <Button color="twitter" floated="right">
          Ask Question
        </Button>
      </Header>
      <Label.Group tag>
        <Label as="a">{`Asked: ${sheshim.createdAt}`}</Label>
        <Label as="a">{`Responded: ${sheshim.answers}`}</Label>
        <Label as="a">{`Viewed: ${sheshim.views} times`}</Label>
      </Label.Group>
      <Divider />
      <Sheshimder>
        <SheshimResponse>
          <Button.Group size="mini" vertical>
            <Button icon="angle up" />
            <Button>{sheshim.votes}</Button>
            <Button icon="angle down" />
          </Button.Group>
          <CodeEditor initialValue={sheshim.body} readonly />
        </SheshimResponse>
      </Sheshimder>
    </AppLayout>
  )
}
