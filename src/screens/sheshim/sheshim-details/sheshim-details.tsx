import React from 'react'
import { Header, Label, Divider, Button } from 'semantic-ui-react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'

import { AppLayout, TextEditor, PageLoader, QuestionItem } from 'components'
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

const SheshimResponseBody = styled.div`
  background: ${colors.whiteSmoke};
  width: 100%;
  margin-left: 8px;
  margin-right: 8px;
  border-radius: 8px;
  padding: 12px;
`

export function SheshimDetails() {
  const history = useHistory()
  const { sheshimId } = useParams<SheshimDetailsParams>()

  const sheshim = data.find((item) => String(item.id) === sheshimId)

  if (!sheshim) {
    return <PageLoader />
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
            <div>
              <Button.Group size="mini" vertical>
                <Button icon="angle up" />
                <Button>{sheshim.votes}</Button>
                <Button icon="angle down" />
              </Button.Group>
            </div>
            <SheshimResponseBody>
              <TextEditor initialValue={sheshim.body} readonly />
            </SheshimResponseBody>
          </SheshimResponseContent>
          <Label.Group color="blue">
            {sheshim.tags.map((tag, idx) => (
              <Label as="a" key={idx}>
                {tag}
              </Label>
            ))}
          </Label.Group>
          <QuestionItem.Started>
            <span>{sheshim.createdAt}</span>&nbsp;
            <Link to="/users">{sheshim.createdBy}</Link>
          </QuestionItem.Started>
          <SheshimComments comments={[]} />
        </SheshimResponse>

        <Header>{`${sheshim.answers.length} Answers`}</Header>

        {sheshim.answers.map((answer: Answer) => (
          <SheshimResponse key={answer.id}>
            <SheshimResponseContent>
              <div>
                <Button.Group size="mini" vertical>
                  <Button icon="angle up" />
                  <Button>{answer.votes}</Button>
                  <Button icon="angle down" />
                </Button.Group>
              </div>
              <SheshimResponseBody>
                <TextEditor initialValue={answer.body} readonly />
              </SheshimResponseBody>
            </SheshimResponseContent>
            <QuestionItem.Started>
              <span>{answer.createdAt}</span>&nbsp;
              <Link to="/users">{answer.createdBy}</Link>
            </QuestionItem.Started>
            <SheshimComments comments={answer.comments} />
            <Divider />
          </SheshimResponse>
        ))}
      </Sheshimder>
    </AppLayout>
  )
}
