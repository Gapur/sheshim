import React, { useEffect, useState } from 'react'
import { Header, Image, Card, Icon } from 'semantic-ui-react'
import { useParams } from 'react-router-dom'

import { AppLayout, NotFound } from 'components'
import { User } from 'models'
import { getUser } from 'services/firebase/user'
import { fireSwalError } from 'utils/error-handler'
import { images } from 'assets'

import { UserDetailsLoader } from './components/user-details-loader'
import { UserSheshimList } from './components/user-sheshim-list'

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

      <UserSheshimList />
    </AppLayout>
  )
}
