import React from 'react'
import { Menu } from 'semantic-ui-react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import { metrics } from 'theme'

const Layout = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  max-width: 94em;
  min-height: calc(100vh - ${metrics.footer_height});
  margin: 0 auto;
  padding-top: ${metrics.header_height};

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
  page: 'home' | 'sheshim' | 'users' | 'profile'
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
