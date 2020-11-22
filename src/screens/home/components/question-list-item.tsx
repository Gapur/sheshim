import React from 'react'
import { Segment, Header, Label } from 'semantic-ui-react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { colors } from 'theme'
import { Question } from '../mock'

const QuestionStats = styled.div`
  display: flex;
  flex-wrap: nowrap;
  margin-right: 8px;
`

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 4px;
  padding-right: 4px;

  span {
    font-size: 17px;
    font-weight: 400;
    color: ${colors.eclipse};
  }
`

const Started = styled.div`
  float: right;
  padding-top: 4px;
  line-height: 18px;
  font-size: 12px;
  color: ${colors.eclipse};
`

interface QuestionListItemProps {
  question: Question
}

export function QuestionListItem({ question }: QuestionListItemProps) {
  return (
    <Segment color="yellow">
      <QuestionStats>
        <Stat>
          <span>{question.votes}</span>
          <span>votes</span>
        </Stat>
        <Stat>
          <span>{question.answersCount}</span>
          <span>answers</span>
        </Stat>
        <Stat>
          <span>{question.views}</span>
          <span>views</span>
        </Stat>
      </QuestionStats>
      <div>
        <Header>
          <Link to={`sheshim/${question.id}`}>{question.title}</Link>
        </Header>
        <Label.Group color="blue">
          {question.tags.map((tag, idx) => (
            <Label as="a" key={idx}>
              {tag}
            </Label>
          ))}
        </Label.Group>
        <Started>
          <span>{question.createdAt}</span>&nbsp;
          <Link to="/users">{question.createdBy}</Link>
        </Started>
      </div>
    </Segment>
  )
}
