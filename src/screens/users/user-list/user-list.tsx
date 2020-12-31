import React, { useEffect, useState } from 'react'
import { Header, Table, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { AppLayout } from 'components'
import { User } from 'models'
import { fetchUsers } from 'services/firebase/user'
import { fireSwalError } from 'utils/error-handler'
import { images } from 'assets'

export function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch(fireSwalError)
      .finally(() => setLoading(false))
  }, [])

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
          {users.map((user) => (
            <Table.Row key={user.id}>
              <Table.Cell>
                <Header as="h4" image>
                  <Image src={user.avatar ?? images.user} rounded size="mini" />
                  <Header.Content>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                    <Header.Subheader>{user.email}</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>{user.reputation}</Table.Cell>
              <Table.Cell>{user.position}</Table.Cell>
              <Table.Cell>{`${user.city}, ${user.country}`}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </AppLayout>
  )
}
