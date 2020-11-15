import React from 'react'
import { RenderLeafProps } from 'slate-react'

export function SlateLeaf(props: RenderLeafProps) {
  const { attributes, leaf } = props
  let children = props.children

  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}
