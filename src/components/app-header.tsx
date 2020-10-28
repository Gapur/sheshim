import React from 'react'
import { Image, Search, Dropdown, Menu } from 'semantic-ui-react'
import styled from 'styled-components'

import { images } from '../assets'
import { colors } from '../theme'

const PLACEHOLDER_IMAGE = 'https://react.semantic-ui.com/images/wireframe/square-image.png'

const Header = styled.div`
  && {
    display: flex;
    align-items: center;
    height: 50px;
    top: 0;
    position: fixed;
    width: 100%;
    z-index: 5050;
    box-shadow: 0 1px 3px 0 rgba(32, 33, 36, 0.28);
    background: ${colors.white};

    .search {
      width: 68%;
    }
    .search > .input {
      width: 100%;
    }
  }

  .header-menu {
    width: 16%;
    margin: 0;
  }

  .ui.menu .item.dropdown.profile {
    padding-top: 0;
    padding-left: 0;
    padding-bottom: 0;
    border: 1px solid ${colors.lavender};
  }
`

const Nav = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 94em;
  margin: 0 auto;
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 16%;

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

export function AppHeader() {
  return (
    <Header>
      <Nav>
        <Logo>
          <Image src={images.logo} />
          <span>Sheshim</span>
        </Logo>
        <Search loading={false} onResultSelect={(e, data) => {}} onSearchChange={() => {}} results={[]} />
        <Menu className="header-menu" secondary size="large">
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
      </Nav>
    </Header>
  )
}
