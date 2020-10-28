import React from 'react'
import { Container, Grid, Menu } from 'semantic-ui-react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

const Layout = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  flex-wrap: wrap;
  padding-top: 50px;
`

interface AppLayoutProps {
  page: 'home' | 'sheshim' | 'users'
  children: React.ReactNode
}

export function AppLayout({ page, children }: AppLayoutProps) {
  const history = useHistory()

  return (
    <Layout>
      <Container>
        <Grid columns="equal" stackable>
          <Grid.Column>
            <Menu pointing secondary vertical>
              <Menu.Item name="home" active={page === 'home'} onClick={() => history.push({ pathname: '/' })} />
              <Menu.Item
                name="sheshim"
                active={page === 'sheshim'}
                onClick={() => history.push({ pathname: '/sheshim' })}
              />
              <Menu.Item name="users" active={page === 'users'} onClick={() => history.push({ pathname: '/users' })} />
            </Menu>
          </Grid.Column>
          <Grid.Column width={10}>{children}</Grid.Column>
          <Grid.Column></Grid.Column>
        </Grid>
      </Container>
    </Layout>
  )
}
