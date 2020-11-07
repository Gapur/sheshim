import React from 'react'
import styled from 'styled-components'

import { colors } from 'theme'

const Footer = styled.footer`
  background: ${colors.cinder};
  padding-top: 8px;
  padding-bottom: 8px;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 93em;
    margin: 0 auto;
  }

  h3,
  span {
    color: ${colors.white};
    margin-top: 4px;
    margin-bottom: 4px;
  }
`

export function AppFooter() {
  const currentYear = new Date().getFullYear()
  return (
    <Footer>
      <div className="container">
        <h3>Sheshim</h3>
        <span>{`Copyright @${currentYear} Gapur Kassym`}</span>
      </div>
    </Footer>
  )
}
