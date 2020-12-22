import React, { useEffect, useState } from 'react'
import { Header, Button } from 'semantic-ui-react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'

import { AppLayout } from 'components'
import { QuestionView } from 'models'
import { fetchSheshims } from 'services/firebase/sheshim'

import { SheshimListItem } from './components/sheshim-list-item'
import { SheshimListLoader } from './components/sheshim-list-loader'

const List = styled.div`
  width: 72%;

  .segment {
    display: flex;

    .placeholder {
      width: 100%;
    }
  }
`

export function SheshimList() {
  const [sheshims, setSheshims] = useState<QuestionView[]>([])
  const [loading, setLoading] = useState(true)
  const history = useHistory()

  useEffect(() => {
    fetchSheshims()
      .then((data: QuestionView[]) => {
        setSheshims(data)
        setLoading(false)
      })
      .catch((err) =>
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        }),
      )
  }, [])

  return (
    <AppLayout page="sheshim">
      <Header>
        All Questions
        <Button color="twitter" floated="right" onClick={() => history.push('/sheshim/create')}>
          Ask Question
        </Button>
      </Header>
      <List>
        {loading ? (
          <SheshimListLoader />
        ) : (
          sheshims.map((item: QuestionView) => <SheshimListItem key={item.id} question={item} />)
        )}
      </List>
    </AppLayout>
  )
}
