import React, { useEffect, useState } from 'react'
import { Header, Button } from 'semantic-ui-react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import { AppLayout } from 'components'
import { Sheshimim } from 'models'
import { fetchTopSheshims } from 'services/firebase/sheshim'
import { fireSwalError } from 'utils/error-handler'

import { QuestionListItem } from './components/question-list-item'
import { QuestionListLoader } from './components/question-list-loader'

const QuestionList = styled.div`
  width: 72%;

  .segment {
    display: flex;

    .placeholder {
      width: 100%;
    }
  }
`

export function Home() {
  const [sheshims, setSheshims] = useState<Sheshimim[]>([])
  const [loading, setLoading] = useState(true)

  const history = useHistory()

  useEffect(() => {
    fetchTopSheshims()
      .then(setSheshims)
      .catch(fireSwalError)
      .finally(() => setLoading(false))
  }, [])

  return (
    <AppLayout page="home">
      <Header>
        Top Questions
        <Button color="twitter" floated="right" onClick={() => history.push('/sheshim/create')}>
          Ask Question
        </Button>
      </Header>
      <QuestionList>
        {loading ? (
          <QuestionListLoader />
        ) : (
          sheshims.map((item: Sheshimim) => <QuestionListItem key={item.id} question={item} />)
        )}
      </QuestionList>
    </AppLayout>
  )
}
