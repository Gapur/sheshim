import React from 'react'
import { Segment, Header } from 'semantic-ui-react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { colors } from 'theme'
import { TextEditor } from 'components'
import { Question } from 'screens/home/mock'

const QuestionStats = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 16px;
`

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
  background: #75b782;
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

const Tags = styled.div`
  float: left;
  line-height: 18px;

  span {
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
  }
`

const QuestionText = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Started = styled.div`
  float: right;
  padding-top: 4px;
  line-height: 18px;
  font-size: 12px;
  color: ${colors.eclipse};
`

interface SheshimListItemProps {
  question: Question
}

export function SheshimListItem({ question }: SheshimListItemProps) {
  return (
    <Segment color="yellow">
      <QuestionStats>
        <Vote>
          <strong>{question.votes}</strong>
          <span>votes</span>
        </Vote>
        <AnswerStatus>
          <strong>{question.answersCount}</strong>
          <span>answers</span>
        </AnswerStatus>
      </QuestionStats>
      <div>
        <Header>
          <Link to={`/sheshim/${question.id}`}>{question.title}</Link>
        </Header>
        <QuestionText>
          <TextEditor initialValue={question.body} readonly />
        </QuestionText>
        <Tags>
          {question.tags.map((tag, idx) => (
            <span key={idx}>{tag}</span>
          ))}
        </Tags>
        <Started>
          <span>{question.createdAt}</span>&nbsp;
          <Link to="/users">{question.createdBy}</Link>
        </Started>
      </div>
    </Segment>
  )
}
