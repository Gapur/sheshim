import React from 'react'
import { Header, Image, Card, Icon, List } from 'semantic-ui-react'
import { Link, useParams } from 'react-router-dom'

import { AppLayout } from '../../../components'
import { data } from '../mock'

interface UserDetailsParamsProps {
  userId: string
}

export function UserDetails() {
  const { userId } = useParams<UserDetailsParamsProps>()

  const user = data.find((item) => String(item.id) === userId)

  if (!user) {
    return <div>Loading</div>
  }

  return (
    <AppLayout page="users">
      <Header>User Details</Header>

      <Card color="yellow">
        <Image src={user.avatar} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{`${user.firstName} ${user.lastName}`}</Card.Header>
          <Card.Meta>
            <span>{user.email}</span>
          </Card.Meta>
          <Card.Description>{`${user.position} from ${user.city}, ${user.country}`}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name="hand peace outline" />
            {`${user.reputation} reputation`}
          </a>
        </Card.Content>
      </Card>

      <Header>My Questions</Header>

      <List animated divided selection verticalAlign="middle">
        <List.Item>
          <List.Content>
            <List.Header>
              <Link to="/">React live server is not displaying anything just showing the tab keep on loading</Link>
            </List.Header>
            <List.Description>asked 3 hours ago</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <List.Header>
              <Link to="/">React live server is not displaying anything just showing the tab keep on loading</Link>
            </List.Header>
            <List.Description>asked 3 hours ago</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <List.Header>
              <Link to="/">React live server is not displaying anything just showing the tab keep on loading</Link>
            </List.Header>
            <List.Description>asked 3 hours ago</List.Description>
          </List.Content>
        </List.Item>
      </List>
    </AppLayout>
  )
}
