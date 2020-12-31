import React, { useEffect, useState } from 'react'
import { Header, Image, Card, Icon, List } from 'semantic-ui-react'
import { Link, useParams } from 'react-router-dom'

import { AppLayout, NotFound } from 'components'
import { User } from 'models'
import { getUser } from 'services/firebase/user'
import { fireSwalError } from 'utils/error-handler'
import { images } from 'assets'

import { UserDetailsLoader } from './components/user-details-loader'

interface UserDetailsParams {
  userId: string
}

export function UserDetails() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const { userId } = useParams<UserDetailsParams>()

  useEffect(() => {
    getUser(userId)
      .then(setUser)
      .catch(fireSwalError)
      .finally(() => setLoading(false))
  }, [userId])

  if (loading) {
    return <UserDetailsLoader />
  }

  if (!user) {
    return <NotFound />
  }

  return (
    <AppLayout page="users">
      <Header>User Details</Header>

      <Card color="yellow">
        <Image src={user.avatar ?? images.user} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{`${user.name}`}</Card.Header>
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
    </AppLayout>
  )
}
