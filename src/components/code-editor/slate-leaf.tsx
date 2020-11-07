import React from 'react'
import styled, { css } from 'styled-components'
import { RenderLeafProps } from 'slate-react'

import { colors } from 'theme'

interface LeafSpanProps {
  [key: string]: unknown
}

const LeafSpan = styled.span<LeafSpanProps>`
  font-family: monospace;
  background: hsla(0, 0%, 100%, 0.5);

  ${(props) => {
    if (props.comment) {
      return css`
        color: slategray;
      `
    }
    if (props.operator || props.url) {
      return css`
        color: ${colors.butteredRum};
      `
    }
    if (props.keyword) {
      return css`
        color: ${colors.cerulean};
      `
    }
    if (props.variable || props.regex) {
      return css`
        color: ${colors.gamboge};
      `
    }
    if (props.number || props.boolean || props.tag || props.constant || props.symbol || props.attr || props.selector) {
      return css`
        color: ${colors.jazzberryJam};
      `
    }
    if (props.punctuation) {
      return css`
        color: ${colors.nobel};
      `
    }
    if (props.string || props.char) {
      return css`
        color: ${colors.christi};
      `
    }
    if (props.function || props.class) {
      return css`
        color: ${colors.cabaret};
      `
    }
  }}
`

export function SlateLeaf({ attributes, children, leaf }: RenderLeafProps) {
  return (
    <LeafSpan {...attributes} {...leaf}>
      {children}
    </LeafSpan>
  )
}
