import React from 'react'
import { Header, Segment, Button } from 'semantic-ui-react'
import styled from 'styled-components'

import { AppLayout } from '../../components'
import { data } from './mock'

const QuestionStats = styled.div`
  display: flex;
  flex-wrap: nowrap;
`

const QuestionSummary = styled.div``

export function Home() {
  return (
    <AppLayout page="home">
      <Header>
        Top Questions
        <Button color="twitter" floated="right">
          Ask Question
        </Button>
      </Header>
      <div>
        {data.map((item) => (
          <Segment key={item.id} color="yellow">
            <QuestionStats>
              <div>
                <span>{item.votes}</span>
                <span>votes</span>
              </div>
              <div>
                <span>{item.answers}</span>
                <span>answers</span>
              </div>
              <div>
                <span>{item.views}</span>
                <span>views</span>
              </div>
            </QuestionStats>
            <QuestionSummary>
              <Header>{item.question}</Header>
              <div>
                {item.tags.map((tag, idx) => (
                  <span key={idx}>{tag}</span>
                ))}
              </div>
              <div>
                <span>{item.createdAt}</span>
                <span>{item.createdBy}</span>
              </div>
            </QuestionSummary>
          </Segment>
        ))}
      </div>
    </AppLayout>
  )
}
