import React from 'react'
import { Segment, Header, Label } from 'semantic-ui-react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { colors } from 'theme'
import { TextEditor, QuestionItem } from 'components'
import { QuestionView } from 'models'

interface SheshimListItemProps {
  question: QuestionView
}

const Vote = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 8px;

  strong {
    font-size: 17px;
    font-weight: 400;
  }

  span {
    font-size: 12px;
    color: ${colors.eclipse};
  }
`

const AnswerStatus = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${colors.bayLeaf};
  padding: 4px;
  border-radius: 3px;
  color: ${colors.white};

  strong {
    font-size: 17px;
  }

  span {
    font-size: 12px;
  }
`

export function SheshimListItem({ question }: SheshimListItemProps) {
  return (
    <Segment color="yellow">
      <QuestionItem.Stats direction="column">
        <Vote>
          <strong>{question.votes}</strong>
          <span>votes</span>
        </Vote>
        <AnswerStatus>
          <strong>{question.answersCount}</strong>
          <span>answers</span>
        </AnswerStatus>
      </QuestionItem.Stats>
      <QuestionItem.Content>
        <Header>
          <Link to={`/sheshim/${question.id}`}>{question.title}</Link>
        </Header>
        <QuestionItem.Body>
          <TextEditor value={question.body} readonly />
        </QuestionItem.Body>
        <Label.Group color="blue">
          {question.tags.map((tag: string, idx: number) => (
            <Label as="a" key={idx}>
              {tag}
            </Label>
          ))}
        </Label.Group>
        <QuestionItem.Started>
          <span>{question.createdAt}</span>&nbsp;
          <Link to="/users">{question.createdBy?.name}</Link>
        </QuestionItem.Started>
      </QuestionItem.Content>
    </Segment>
  )
}
