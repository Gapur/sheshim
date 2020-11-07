import React from 'react'
import { Header, Label, Divider, Button } from 'semantic-ui-react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'

import { AppLayout, CodeEditor } from 'components'
import { data, Answer } from 'screens/home/mock'
import { colors } from 'theme'

import { SheshimComments } from './components/sheshim-comments'

interface SheshimDetailsParams {
  sheshimId: string
}

const Sheshimder = styled.div`
  width: 72%;
`

const SheshimResponse = styled.div`
  display: flex;
  flex-direction: column;
`

const SheshimResponseContent = styled.div`
  display: flex;
  margin-bottom: 8px;
`

const Tag = styled.span`
  background: ${colors.solitude};
  color: ${colors.airForceBlue};
  white-space: nowrap;
  text-decoration: none;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 3px;
  margin: 2px 2px 2px 0;
  padding: 1px 4px;
  cursor: pointer;
`

const Started = styled.div`
  align-self: flex-end;
  padding-top: 4px;
  line-height: 18px;
  font-size: 12px;
  color: ${colors.eclipse};
`

export function SheshimDetails() {
  const history = useHistory()
  const { sheshimId } = useParams<SheshimDetailsParams>()

  const sheshim = data.find((item) => String(item.id) === sheshimId)

  if (!sheshim) {
    return <div>Loading</div>
  }

  return (
    <AppLayout page="sheshim">
      <Header>
        {sheshim.title}
        <Button color="twitter" floated="right" onClick={() => history.push('/sheshim/create')}>
          Ask Question
        </Button>
      </Header>
      <Label.Group tag color="teal">
        <Label as="a">{`Asked: ${sheshim.createdAt}`}</Label>
        <Label as="a">{`Responded: ${sheshim.answersCount}`}</Label>
        <Label as="a">{`Viewed: ${sheshim.views} times`}</Label>
      </Label.Group>
      <Divider />
      <Sheshimder>
        <SheshimResponse>
          <SheshimResponseContent>
            <Button.Group size="mini" vertical>
              <Button icon="angle up" />
              <Button>{sheshim.votes}</Button>
              <Button icon="angle down" />
            </Button.Group>
            <CodeEditor initialValue={sheshim.body} readonly />
          </SheshimResponseContent>
          <div>
            {sheshim.tags.map((tag, idx) => (
              <Tag key={idx}>{tag}</Tag>
            ))}
          </div>
          <Started>
            <span>{sheshim.createdAt}</span>&nbsp;
            <Link to="/users">{sheshim.createdBy}</Link>
          </Started>
          <SheshimComments comments={[]} />
        </SheshimResponse>

        <Header>{`${sheshim.answers.length} Answers`}</Header>

        {sheshim.answers.map((answer: Answer) => (
          <SheshimResponse key={answer.id}>
            <SheshimResponseContent>
              <Button.Group size="mini" vertical>
                <Button icon="angle up" />
                <Button>{answer.votes}</Button>
                <Button icon="angle down" />
              </Button.Group>
              <CodeEditor initialValue={answer.body} readonly />
            </SheshimResponseContent>
            <Started>
              <span>{answer.createdAt}</span>&nbsp;
              <Link to="/users">{answer.createdBy}</Link>
            </Started>
            <SheshimComments comments={answer.comments} />
            <Divider />
          </SheshimResponse>
        ))}
      </Sheshimder>
    </AppLayout>
  )
}
