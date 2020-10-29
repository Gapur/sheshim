import React from 'react'
import { Header, Button } from 'semantic-ui-react'
import styled from 'styled-components'

import { AppLayout } from '../../components'
import { QuestionSegment } from './components/question-segment'
import { data } from './mock'

const QuestionSegments = styled.div`
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
      <QuestionSegments>
        {data.map((item) => (
          <QuestionSegment key={item.id} question={item} />
        ))}
      </QuestionSegments>
    </AppLayout>
  )
}
