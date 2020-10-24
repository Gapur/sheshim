import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Switch, Route } from 'react-router-dom'
import { Container, Image, Grid, Search, Dropdown, Menu } from 'semantic-ui-react'
import styled from 'styled-components'

import { useAuth } from './context/auth-context'
import { FullPageErrorFallback } from './components'
import { images } from './assets'
import { colors } from './theme'

import { Home } from './screens/home/home'

function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  )
}

const Header = styled.div`
  && {
    display: flex;
    align-items: center;
    height: 50px;
    position: fixed;
    width: 100%;
    z-index: 5050;
    box-shadow: 0 1px 3px 0 rgba(32, 33, 36, 0.28);

    .grid > .column {
      padding: 0px;
    }

    .search > .input {
      width: 100%;
    }
  }
`

const Logo = styled.div`
  display: flex;
  align-items: center;

  .image {
    width: 28px;
  }

  span {
    font-size: 1.28571429em;
    margin-left: 8px;
  }
`

const HeaderDropdown = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${colors.lavender};
  padding: 0;
  .ui.menu {
    margin: 0;
  }
  .ui.menu .item.dropdown.profile {
    padding-top: 0;
    padding-left: 0;
    padding-bottom: 0;
    padding-right: 12px;
    background: ${colors.white};
    border: 1px solid ${colors.lavender};
  }
  .ui.menu .item.dropdown.notification {
    padding: 0;
    margin-right: 32px;
    background: transparent;
  }
`

const DropdownAvatar = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  .image {
    height: 48px;
    margin-right: 12px;
    border-bottom-left-radius: 4px;
    border-top-left-radius: 4px;
  }
`

const PLACEHOLDER_IMAGE = 'https://react.semantic-ui.com/images/wireframe/square-image.png'

export default function AuthenticatedApp() {
  const { user } = useAuth()
  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <Header>
        <Container>
          <Grid columns="equal" stackable>
            <Grid.Column>
              <Logo>
                <Image src={images.logo} />
                <span>Sheshim</span>
              </Logo>
            </Grid.Column>
            <Grid.Column width={10}>
              <Search loading={false} onResultSelect={(e, data) => {}} onSearchChange={() => {}} results={[]} />
            </Grid.Column>
            <Grid.Column>
              <HeaderDropdown>
                <Menu secondary size="large">
                  <Menu.Menu position="right">
                    <Dropdown
                      item
                      className="profile"
                      trigger={
                        <DropdownAvatar>
                          <Image src={PLACEHOLDER_IMAGE} />
                          Gapur
                        </DropdownAvatar>
                      }
                    >
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => {
                            window.location.href = 'mailto:gapur.kassym@gmail.com'
                          }}
                        >
                          Help
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => {}}>Logout</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Menu.Menu>
                </Menu>
              </HeaderDropdown>
            </Grid.Column>
          </Grid>
        </Container>
      </Header>
      <AppRoutes />
    </ErrorBoundary>
  )
}
