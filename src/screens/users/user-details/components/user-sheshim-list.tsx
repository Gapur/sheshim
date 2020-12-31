import React, { useEffect, useState } from 'react'
import { List, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import moment from 'moment'

import { Sheshimim } from 'models'
import { getUserSheshims } from 'services/firebase/user'
import { fireSwalError } from 'utils/error-handler'

import { UserDetailsParams } from '../user-details'

const SheshimList = styled.div`
  margin-top: 24px;
`

export function UserSheshimList() {
  const [userSheshims, setUserSheshims] = useState<Sheshimim[]>([])
  const [loading, setLoading] = useState(true)
  const { userId } = useParams<UserDetailsParams>()

  useEffect(() => {
    getUserSheshims(userId)
      .then(setUserSheshims)
      .catch(fireSwalError)
      .finally(() => setLoading(false))
  }, [userId])

  return (
    <SheshimList>
      <Header>My Questions</Header>
      <List animated divided selection verticalAlign="middle">
        {userSheshims.map((userSheshim) => (
          <List.Item key={userSheshim.id}>
            <List.Content>
              <List.Header>
                <Link to="/">{userSheshim.title}</Link>
              </List.Header>
              <List.Description>{`asked ${moment(
                userSheshim.createdAt?.toDate(),
              ).fromNow()}`}</List.Description>
            </List.Content>
          </List.Item>
        ))}
      </List>
    </SheshimList>
  )
}
