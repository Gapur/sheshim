import React, { useEffect, useState } from 'react'
import { Header, Table } from 'semantic-ui-react'

import { AppLayout } from 'components'
import { User } from 'models'
import { fetchUsers } from 'services/firebase/user'
import { fireSwalError } from 'utils/error-handler'

import { UserListItem } from './components/user-list-item'
import { UserListLoader } from './components/user-list-loader'

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
          {loading ? (
            <UserListLoader />
          ) : (
            users.map((user) => <UserListItem key={user.id} user={user} />)
          )}
        </Table.Body>
      </Table>
    </AppLayout>
  )
}
