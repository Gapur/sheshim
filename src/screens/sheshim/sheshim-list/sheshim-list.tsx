import React, { useEffect, useState } from 'react'
import { Header, Button } from 'semantic-ui-react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import { AppLayout } from 'components'
import { QuestionView } from 'models'
import { fetchSheshims } from 'services/firebase/sheshim'

import { SheshimListItem } from './components/sheshim-list-item'

const List = styled.div`
  width: 72%;

  .segment {
    display: flex;
  }
`

export function SheshimList() {
  const history = useHistory()
  const [sheshims, setSheshims] = useState<QuestionView[]>([])

  useEffect(() => {
    fetchSheshims().then(setSheshims)
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
        {sheshims.map((item: QuestionView) => (
          <SheshimListItem key={item.id} question={item} />
        ))}
      </List>
    </AppLayout>
  )
}
