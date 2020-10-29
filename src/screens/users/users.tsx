import React from 'react'
import { Header, Table, Image } from 'semantic-ui-react'

import { AppLayout } from '../../components'
import { data } from './mock'

export function Users() {
  return (
    <AppLayout page="users">
      <Header>Users</Header>
      <Table basic="very" celled collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Username</Table.HeaderCell>
            <Table.HeaderCell>Reputation</Table.HeaderCell>
            <Table.HeaderCell>Position</Table.HeaderCell>
            <Table.HeaderCell>Location</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>
                <Header as="h4" image>
                  <Image src={item.avatar} rounded size="mini" />
                  <Header.Content>
                    {`${item.firstName} ${item.lastName}`}
                    <Header.Subheader>{item.email}</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>{item.reputation}</Table.Cell>
              <Table.Cell>{item.position}</Table.Cell>
              <Table.Cell>{`${item.city}, ${item.country}`}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </AppLayout>
  )
}
