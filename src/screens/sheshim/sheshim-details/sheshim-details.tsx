import React, { useEffect, useState } from 'react'
import { Header, Label, Divider, Button } from 'semantic-ui-react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import moment from 'moment'

import { AppLayout, NotFound, PageLoader } from 'components'
import { Answer, QuestionView } from 'models'
import { colors } from 'theme'
import { getSheshim } from 'services/firebase/sheshim'

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
  const [sheshim, setSheshim] = useState<QuestionView | null>(null)
  const [loading, setLoading] = useState(true)
  const history = useHistory()
  const { sheshimId } = useParams<SheshimDetailsParams>()

  useEffect(() => {
    getSheshim(sheshimId)
      .then(setSheshim)
      .catch((err) =>
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        }),
      )
      .finally(() => setLoading(false))
  }, [sheshimId, history])

  if (loading) {
    return <PageLoader />
  }

  if (!sheshim) {
    return <NotFound />
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
        <Label as="a">{`Asked: ${moment(sheshim.createdAt).fromNow()}`}</Label>
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
            createdBy={sheshim.createdBy?.name ?? 'user'}
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
              createdBy={answer.createdBy.name}
              comments={answer.comments}
            />
          </SheshimResponse>
        ))}

        <SheshimAnswerForm />
      </Sheshimder>
    </AppLayout>
  )
}
