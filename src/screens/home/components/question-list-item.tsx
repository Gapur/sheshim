import React from 'react'
import { Segment, Header, Label } from 'semantic-ui-react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { QuestionItem } from 'components'
import { colors } from 'theme'
import { Sheshimim } from 'models'

interface QuestionListItemProps {
  question: Sheshimim
}

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

export function QuestionListItem({ question }: QuestionListItemProps) {
  return (
    <Segment color="yellow">
      <QuestionItem.Stats>
        <Stat>
          <span>{question.votes}</span>
          <span>votes</span>
        </Stat>
        <Stat>
          <span>{question.answers.length}</span>
          <span>answers</span>
        </Stat>
        <Stat>
          <span>{question.views}</span>
          <span>views</span>
        </Stat>
      </QuestionItem.Stats>
      <QuestionItem.Content>
        <Header>
          <Link to={`sheshim/${question.id}`}>{question.title}</Link>
        </Header>
        <Label.Group color="blue">
          {question.tags.map((tag: string, idx: number) => (
            <Label as="a" key={idx}>
              {tag}
            </Label>
          ))}
        </Label.Group>
        <QuestionItem.Started>
          <span>{`asked ${moment(question.createdAt?.toDate()).fromNow()} by`}</span>&nbsp;
          <Link to="/users">{question.createdBy?.name}</Link>
        </QuestionItem.Started>
      </QuestionItem.Content>
    </Segment>
  )
}
