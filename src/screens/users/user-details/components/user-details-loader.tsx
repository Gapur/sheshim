import React from 'react'
import { Header, Card, List, Placeholder } from 'semantic-ui-react'

import { AppLayout } from 'components'

export function UserDetailsLoader() {
  return (
    <AppLayout page="users">
      <Header>User Details</Header>

      <Card color="yellow">
        <Placeholder>
          <Placeholder.Image square />
        </Placeholder>
        <Card.Content>
          <Placeholder>
            <Placeholder.Header>
              <Placeholder.Line length="very short" />
              <Placeholder.Line length="medium" />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line length="short" />
            </Placeholder.Paragraph>
          </Placeholder>
        </Card.Content>
        <Card.Content extra>
          <Placeholder>
            <Placeholder.Paragraph>
              <Placeholder.Line length="short" />
            </Placeholder.Paragraph>
          </Placeholder>
        </Card.Content>
      </Card>

      <Header>My Questions</Header>

      <List animated divided selection verticalAlign="middle">
        <List.Item>
          <List.Content>
            <Placeholder fluid>
              <Placeholder.Header>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
            </Placeholder>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <Placeholder fluid>
              <Placeholder.Header>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
            </Placeholder>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <Placeholder fluid>
              <Placeholder.Header>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
            </Placeholder>
          </List.Content>
        </List.Item>
      </List>
    </AppLayout>
  )
}
