import React from 'react'
import { Header, Table, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { User } from 'models'
import { images } from 'assets'

interface UserListItemProps {
  user: User
}

export function UserListItem({ user }: UserListItemProps) {
  return (
    <Table.Row>
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
  )
}
