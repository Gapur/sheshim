import React from 'react'
import { Header, Label, Divider, Button } from 'semantic-ui-react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import { AppLayout, PageLoader } from 'components'
import { data, Answer } from 'screens/home/mock'
import { colors } from 'theme'

import { SheshimResponseContent } from './components/sheshim-response-content'
import { SheshimAnswerForm } from './components/sheshim-answer-form'

interface SheshimDetailsParams {
  sheshimId: string
}

const Sheshimder = styled.div`
  width: 72%;
`

const SheshimResponse = styled.div`
  display: flex;
  border-bottom: 1px solid ${colors.solitude};
  margin-bottom: 16px;
  padding-bottom: 12px;
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
          <div>
            <Button.Group size="mini" vertical>
              <Button icon="angle up" />
              <Button>{sheshim.votes}</Button>
              <Button icon="angle down" />
            </Button.Group>
          </div>
          <SheshimResponseContent
            body={sheshim.body}
            tags={sheshim.tags}
            createdAt={sheshim.createdAt}
            createdBy={sheshim.createdBy}
            comments={sheshim.comments}
          />
        </SheshimResponse>

        <Header>{`${sheshim.answers.length} Answers`}</Header>

        {sheshim.answers.map((answer: Answer) => (
          <SheshimResponse key={answer.id}>
            <div>
              <Button.Group size="mini" vertical>
                <Button icon="angle up" />
                <Button>{answer.votes}</Button>
                <Button icon="angle down" />
              </Button.Group>
            </div>
            <SheshimResponseContent
              body={answer.body}
              createdAt={answer.createdAt}
              createdBy={answer.createdBy}
              comments={answer.comments}
            />
          </SheshimResponse>
        ))}

        <SheshimAnswerForm />
      </Sheshimder>
    </AppLayout>
  )
}
