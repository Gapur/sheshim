import React from 'react'
import { List, Header, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import moment from 'moment'

import { Sheshimim } from 'models'

interface UserSheshimListProps {
  sheshims: Sheshimim[]
}

const SheshimList = styled.div`
  margin-top: 24px;
`

export function UserSheshimList({ sheshims }: UserSheshimListProps) {
  return (
    <SheshimList>
      <Header>My Questions</Header>
      <List animated divided selection verticalAlign="middle">
        {sheshims.length ? (
          sheshims.map((sheshim) => (
            <List.Item key={sheshim.id}>
              <List.Content>
                <List.Header>
                  <Link to="/">{sheshim.title}</Link>
                </List.Header>
                <List.Description>
                  {`asked ${moment(sheshim.createdAt?.toDate()).fromNow()}`}
                </List.Description>
              </List.Content>
            </List.Item>
          ))
        ) : (
          <List.Item>
            <Header as="h4" icon textAlign="center">
              <Icon name="database" />
              <Header.Content>No questions data</Header.Content>
            </Header>
          </List.Item>
        )}
      </List>
    </SheshimList>
  )
}
