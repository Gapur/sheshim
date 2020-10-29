import React from 'react'
import { Menu } from 'semantic-ui-react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

const Layout = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
  width: 100%;
  max-width: 94em;
  margin: 0 auto;
  padding-top: 50px;

  .menu {
    margin-bottom: 0;
    padding-top: 24px;
  }
`

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  flex-direction: column;
  padding: 2%;
`

interface AppLayoutProps {
  page: 'home' | 'sheshim' | 'users'
  children: React.ReactNode
}

export function AppLayout({ page, children }: AppLayoutProps) {
  const history = useHistory()

  return (
    <Layout>
      <Menu pointing secondary vertical>
        <Menu.Item name="home" active={page === 'home'} onClick={() => history.push({ pathname: '/' })} />
        <Menu.Item name="sheshim" active={page === 'sheshim'} onClick={() => history.push({ pathname: '/sheshim' })} />
        <Menu.Item name="users" active={page === 'users'} onClick={() => history.push({ pathname: '/users' })} />
      </Menu>
      <Content>{children}</Content>
    </Layout>
  )
}
