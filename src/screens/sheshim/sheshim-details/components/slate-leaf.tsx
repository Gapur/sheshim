import React from 'react'
import styled, { css } from 'styled-components'
import { RenderLeafProps } from 'slate-react'

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
        color: #9a6e3a;
      `
    }
    if (props.keyword) {
      return css`
        color: #07a;
      `
    }
    if (props.variable || props.regex) {
      return css`
        color: #e90;
      `
    }
    if (props.number || props.boolean || props.tag || props.constant || props.symbol || props.attr || props.selector) {
      return css`
        color: #905;
      `
    }
    if (props.punctuation) {
      return css`
        color: #999;
      `
    }
    if (props.string || props.char) {
      return css`
        color: #690;
      `
    }
    if (props.function || props.class) {
      return css`
        color: #dd4a68;
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
