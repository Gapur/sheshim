import React, { useEffect, useState } from 'react'
import { Header, Button } from 'semantic-ui-react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'

import { AppLayout } from 'components'
import { QuestionView } from 'models'
import { fetchTopSheshims } from 'services/firebase/sheshim'

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
  const [sheshims, setSheshims] = useState<QuestionView[]>([])
  const [loading, setLoading] = useState(true)

  const history = useHistory()

  useEffect(() => {
    fetchTopSheshims()
      .then(setSheshims)
      .catch((err) =>
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        }),
      )
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
          sheshims.map((item: QuestionView) => <QuestionListItem key={item.id} question={item} />)
        )}
      </QuestionList>
    </AppLayout>
  )
}
