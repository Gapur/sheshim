import React from 'react'
import { List, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const SheshimList = styled.div`
  margin-top: 24px;
`

export function UserSheshimList() {
  return (
    <SheshimList>
      <Header>My Questions</Header>
      <List animated divided selection verticalAlign="middle">
        <List.Item>
          <List.Content>
            <List.Header>
              <Link to="/">
                React live server is not displaying anything just showing the tab keep on loading
              </Link>
            </List.Header>
            <List.Description>asked 3 hours ago</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <List.Header>
              <Link to="/">
                React live server is not displaying anything just showing the tab keep on loading
              </Link>
            </List.Header>
            <List.Description>asked 3 hours ago</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <List.Header>
              <Link to="/">
                React live server is not displaying anything just showing the tab keep on loading
              </Link>
            </List.Header>
            <List.Description>asked 3 hours ago</List.Description>
          </List.Content>
        </List.Item>
      </List>
    </SheshimList>
  )
}
