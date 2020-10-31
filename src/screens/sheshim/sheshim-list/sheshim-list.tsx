import React from 'react'
import { Header, Button } from 'semantic-ui-react'
import styled from 'styled-components'

import { AppLayout } from '../../../components'
import { SheshimListItem } from './components/sheshim-list-item'
import { data } from '../../home/mock'

const List = styled.div`
  width: 72%;

  .segment {
    display: flex;
  }
`

export function SheshimList() {
  return (
    <AppLayout page="sheshim">
      <Header>
        All Questions
        <Button color="twitter" floated="right">
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
