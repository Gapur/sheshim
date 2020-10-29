import React from 'react'
import { Segment, Header } from 'semantic-ui-react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { Question } from '../mock'
import { colors } from '../../../theme'

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

const Started = styled.div`
  float: right;
  padding-top: 4px;
  line-height: 18px;
  font-size: 12px;
  color: ${colors.eclipse};
`

interface QuestionSegmentProps {
  question: Question
}

export function QuestionSegment({ question }: QuestionSegmentProps) {
  return (
    <Segment color="yellow">
      <QuestionStats>
        <Stat>
          <span>{question.votes}</span>
          <span>votes</span>
        </Stat>
        <Stat>
          <span>{question.answers}</span>
          <span>answers</span>
        </Stat>
        <Stat>
          <span>{question.views}</span>
          <span>views</span>
        </Stat>
      </QuestionStats>
      <div>
        <Header>
          <Link to="/">{question.question}</Link>
        </Header>
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
