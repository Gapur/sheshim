import React, { useEffect, useState } from 'react'
import { Header, Button } from 'semantic-ui-react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import { AppLayout } from 'components'
import { Sheshimim } from 'models'
import { fetchSheshims } from 'services/firebase/sheshim'
import { fireSwalError } from 'utils/error-handler'

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
  const [sheshims, setSheshims] = useState<Sheshimim[]>([])
  const [loading, setLoading] = useState(true)

  const history = useHistory()

  useEffect(() => {
    fetchSheshims()
      .then(setSheshims)
      .catch(fireSwalError)
      .finally(() => setLoading(false))
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
          sheshims.map((item: Sheshimim) => <SheshimListItem key={item.id} question={item} />)
        )}
      </List>
    </AppLayout>
  )
}
