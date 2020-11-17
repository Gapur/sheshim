import React from 'react'
import { RenderElementProps } from 'slate-react'

export enum SlateElementType {
  BOLD = 'bold',
  ITALIC = 'italic',
  UNDERLINE = 'underline',
  CODE = 'code',
  BLOCK_QUOTE = 'block-quote',
  BULLETED_LIST = 'bulleted-list',
  HEADING_ONE = 'heading-one',
  HEADING_TWO = 'heading-two',
  LIST_ITEM = 'list-item',
  NUMBERED_LIST = 'numbered-list',
}

export const SLATE_LIST_TYPES = [SlateElementType.NUMBERED_LIST, SlateElementType.BULLETED_LIST]

export function SlateElement({ attributes, children, element }: RenderElementProps) {
  switch (element.type) {
    case SlateElementType.BLOCK_QUOTE:
      return <blockquote {...attributes}>{children}</blockquote>
    case SlateElementType.BULLETED_LIST:
      return <ul {...attributes}>{children}</ul>
    case SlateElementType.HEADING_ONE:
      return <h1 {...attributes}>{children}</h1>
    case SlateElementType.HEADING_TWO:
      return <h2 {...attributes}>{children}</h2>
    case SlateElementType.LIST_ITEM:
      return <li {...attributes}>{children}</li>
    case SlateElementType.NUMBERED_LIST:
      return <ol {...attributes}>{children}</ol>
    default:
      return <p {...attributes}>{children}</p>
  }
}
