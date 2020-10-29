import React from 'react'
import { Header, Button } from 'semantic-ui-react'
import styled from 'styled-components'

import { AppLayout } from '../../components'
import { QuestionListItem } from './components/question-list-item'
import { data } from './mock'

const QuestionList = styled.div`
  width: 72%;

  .segment {
    display: flex;
  }
`

export function Home() {
  return (
    <AppLayout page="home">
      <Header>
        Top Questions
        <Button color="twitter" floated="right">
          Ask Question
        </Button>
      </Header>
      <QuestionList>
        {data.map((item) => (
          <QuestionListItem key={item.id} question={item} />
        ))}
      </QuestionList>
    </AppLayout>
  )
}
