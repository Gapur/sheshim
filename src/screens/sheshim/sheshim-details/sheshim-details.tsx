import React, { useEffect, useState } from 'react'
import { Header, Label, Divider, Button } from 'semantic-ui-react'
import { useParams, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import moment from 'moment'
import { Node as SlateNode } from 'slate'

import { AppLayout, NotFound } from 'components'
import { SheshimAnswer, Sheshimim } from 'models'
import { colors } from 'theme'
import {
  getSheshim,
  createSheshimAnswer,
  updateSheshimVote,
  updateSheshimAnswers,
} from 'services/firebase/sheshim'
import { fireSwalError } from 'utils/error-handler'

import { SheshimResponseContent } from './components/sheshim-response-content'
import { SheshimAnswerForm } from './components/sheshim-answer-form'
import { SheshimDetailsLoader } from './components/sheshim-details-loader'

export interface SheshimDetailsParams {
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
  const [sheshim, setSheshim] = useState<Sheshimim | null>(null)
  const [loading, setLoading] = useState(true)
  const [sheshimVoting, setSheshimVoting] = useState(false)
  const [sheshimAnswerVoting, setSheshimAnswerVoting] = useState(false)
  const history = useHistory()
  const { sheshimId } = useParams<SheshimDetailsParams>()

  useEffect(() => {
    getSheshim(sheshimId)
      .then(setSheshim)
      .catch(fireSwalError)
      .finally(() => setLoading(false))
  }, [sheshimId, history])

  const onCreateSheshimAnswer = (data: SlateNode[]) =>
    createSheshimAnswer(sheshimId, data)
      .then((sheshimAnswer) => {
        const updatedSheshim = {
          ...sheshim,
          answers: sheshim?.answers.concat(sheshimAnswer),
        } as Sheshimim
        setSheshim(updatedSheshim)
      })
      .catch(fireSwalError)

  if (loading) {
    return <SheshimDetailsLoader />
  }

  if (!sheshim) {
    return <NotFound />
  }

  const onUpdateSheshimVote = (votes: number) => {
    setSheshimVoting(true)
    updateSheshimVote(sheshimId, votes)
      .then(() => setSheshim({ ...sheshim, votes }))
      .finally(() => setSheshimVoting(false))
  }

  const onUpdateSheshimAnswers = (answerIdx: number, votes: number) => {
    setSheshimAnswerVoting(true)
    const updatedSheshimAnswers = sheshim.answers.map((answer, idx) =>
      idx === answerIdx ? { ...answer, votes } : answer,
    )
    updateSheshimAnswers(sheshimId, updatedSheshimAnswers)
      .then(() => setSheshim({ ...sheshim, answers: updatedSheshimAnswers }))
      .finally(() => setSheshimAnswerVoting(false))
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
        <Label as="a">{`Responded: ${sheshim.answers.length}`}</Label>
        <Label as="a">{`Viewed: ${sheshim.views} times`}</Label>
      </Label.Group>
      <Divider />
      <Sheshimder>
        <SheshimResponse>
          <div>
            <Button.Group size="mini" vertical>
              <Button
                icon="angle up"
                disabled={sheshimVoting}
                onClick={() => onUpdateSheshimVote(sheshim.votes + 1)}
              />
              <Button>{sheshim.votes}</Button>
              <Button
                icon="angle down"
                disabled={sheshimVoting}
                onClick={() => onUpdateSheshimVote(sheshim.votes - 1)}
              />
            </Button.Group>
          </div>
          <SheshimResponseContent
            body={sheshim.body}
            tags={sheshim.tags}
            createdAt={sheshim.createdAt?.toDate()}
            createdBy={sheshim.createdBy?.name ?? 'user'}
            comments={sheshim.comments}
          />
        </SheshimResponse>

        <Header>{`${sheshim.answers.length} Answers`}</Header>

        {sheshim.answers.map((answer: SheshimAnswer, idx: number) => (
          <SheshimResponse key={idx}>
            <div>
              <Button.Group size="mini" vertical>
                <Button
                  icon="angle up"
                  disabled={sheshimAnswerVoting}
                  onClick={() => onUpdateSheshimAnswers(idx, answer.votes + 1)}
                />
                <Button>{answer.votes}</Button>
                <Button
                  icon="angle down"
                  disabled={sheshimAnswerVoting}
                  onClick={() => onUpdateSheshimAnswers(idx, answer.votes - 1)}
                />
              </Button.Group>
            </div>
            <SheshimResponseContent
              body={answer.body}
              createdAt={answer.createdAt?.toDate()}
              createdBy={answer.createdBy.name}
              comments={answer.comments}
            />
          </SheshimResponse>
        ))}

        <SheshimAnswerForm onSubmit={onCreateSheshimAnswer} />
      </Sheshimder>
    </AppLayout>
  )
}
