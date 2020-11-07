import React from 'react'
import { Header, Button } from 'semantic-ui-react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import { AppLayout } from 'components'
import { data } from 'screens/home/mock'
import { SheshimListItem } from './components/sheshim-list-item'

const List = styled.div`
  width: 72%;

  .segment {
    display: flex;
  }
`

export function SheshimList() {
  const history = useHistory()

  return (
    <AppLayout page="sheshim">
      <Header>
        All Questions
        <Button color="twitter" floated="right" onClick={() => history.push('/sheshim/create')}>
          Ask Question
        </Button>
      </Header>
      <List>
        {data.map((item) => (
          <SheshimListItem key={item.id} question={item} />
        ))}
      </List>
    </AppLayout>
  )
}
