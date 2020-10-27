import React from 'react'
import { Container, Image, Grid, Search, Dropdown, Menu } from 'semantic-ui-react'
import styled from 'styled-components'

import { colors } from '../../theme'
import { images } from '../../assets'

const PLACEHOLDER_IMAGE = 'https://react.semantic-ui.com/images/wireframe/square-image.png'

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
      padding-top: 0;
      padding-bottom: 0;
    }

    .search {
      margin-top: 2px;
      margin-bottom: 2px;
    }
    .search > .input {
      width: 100%;
    }
  }

  .ui.menu .item.dropdown.profile {
    padding-top: 0;
    padding-left: 0;
    padding-bottom: 0;
    border: 1px solid ${colors.lavender};
  }
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  height: 100%;

  .image {
    width: 28px;
  }

  span {
    font-size: 1.28571429em;
    margin-left: 8px;
  }
`

const DropdownAvatar = styled.span`
  display: flex;
  align-items: center;

  .image {
    height: 36px;
    margin-right: 12px;
    border-bottom-left-radius: 4px;
    border-top-left-radius: 4px;
  }
`

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
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
            <Menu secondary size="large">
              <Menu.Menu>
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
          </Grid.Column>
        </Grid>
      </Container>
    </Header>
  )
}
