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
  updateSheshimAnswerVote,
  createSheshimComment,
  updateSheshimAnswerComments,
  updateSheshimViews,
} from 'services/firebase/sheshim'
import { fireSwalError } from 'utils/error-handler'

import { SheshimResponseContent } from './components/sheshim-response-content'
import { SheshimAnswerForm } from './components/sheshim-answer-form'
import { SheshimDetailsLoader } from './components/sheshim-details-loader'
import { FormValues } from './components/sheshim-comment-form'
import { SheshimVotingControl } from './components/sheshim-voting-control'

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
      .then((sheshimim: Sheshimim | null) => {
        if (sheshimim) {
          return updateSheshimViews(sheshimId, sheshimim.views + 1).then(() =>
            setSheshim({ ...sheshimim, views: sheshimim.views + 1 }),
          )
        }
      })
      .catch(fireSwalError)
      .finally(() => setLoading(false))
  }, [sheshimId])

  if (loading) {
    return <SheshimDetailsLoader />
  }

  if (!sheshim) {
    return <NotFound />
  }

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

  const onUpdateSheshimVote = (votes: number) => {
    setSheshimVoting(true)
    updateSheshimVote(sheshimId, votes)
      .then(() => setSheshim({ ...sheshim, votes }))
      .finally(() => setSheshimVoting(false))
  }

  const onUpdateSheshimAnswers = (answerIdx: number, votes: number) => {
    setSheshimAnswerVoting(true)
    updateSheshimAnswerVote(sheshimId, sheshim.answers, answerIdx, votes)
      .then((updatedSheshimAnswers) => setSheshim({ ...sheshim, answers: updatedSheshimAnswers }))
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
          <SheshimVotingControl
            voting={sheshimVoting}
            votes={sheshim.votes}
            onUpdate={onUpdateSheshimVote}
          />
          <SheshimResponseContent
            body={sheshim.body}
            tags={sheshim.tags}
            createdAt={sheshim.createdAt?.toDate()}
            createdBy={sheshim.createdBy?.name ?? 'user'}
            comments={sheshim.comments}
            onAddComment={(data: FormValues) => createSheshimComment(sheshimId, data)}
          />
        </SheshimResponse>

        <Header>{`${sheshim.answers.length} Answers`}</Header>

        {sheshim.answers.map((answer: SheshimAnswer, answerIdx: number) => (
          <SheshimResponse key={answerIdx}>
            <SheshimVotingControl
              voting={sheshimAnswerVoting}
              votes={answer.votes}
              onUpdate={(votes: number) => onUpdateSheshimAnswers(answerIdx, votes)}
            />
            <SheshimResponseContent
              body={answer.body}
              createdAt={answer.createdAt?.toDate()}
              createdBy={answer.createdBy.name}
              comments={answer.comments}
              onAddComment={(data: FormValues) =>
                updateSheshimAnswerComments(sheshimId, sheshim.answers, answerIdx, data)
              }
            />
          </SheshimResponse>
        ))}

        <SheshimAnswerForm onSubmit={onCreateSheshimAnswer} />
      </Sheshimder>
    </AppLayout>
  )
}
