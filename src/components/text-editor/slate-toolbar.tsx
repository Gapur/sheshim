import React from 'react'
import styled from 'styled-components'

import { SlateElementType } from './slate-element'
import { SlateToolbarButton, ToolbarButtonProps, ToolbarButtonType } from './slate-toolbar-button'

const ToolbarButtons: ToolbarButtonProps[] = [
  { type: ToolbarButtonType.MARK, format: SlateElementType.BOLD, icon: 'bold' },
  { type: ToolbarButtonType.MARK, format: SlateElementType.ITALIC, icon: 'italic' },
  { type: ToolbarButtonType.MARK, format: SlateElementType.UNDERLINE, icon: 'underline' },
  { type: ToolbarButtonType.MARK, format: SlateElementType.CODE, icon: 'code' },
  { type: ToolbarButtonType.BLOCK, format: SlateElementType.HEADING_ONE, icon: 'heading' },
  { type: ToolbarButtonType.BLOCK, format: SlateElementType.HEADING_TWO, icon: 'text height' },
  { type: ToolbarButtonType.BLOCK, format: SlateElementType.BLOCK_QUOTE, icon: 'quote left' },
  { type: ToolbarButtonType.BLOCK, format: SlateElementType.NUMBERED_LIST, icon: 'numbered list' },
  { type: ToolbarButtonType.BLOCK, format: SlateElementType.BULLETED_LIST, icon: 'unordered list' },
]

const Menu = styled.div`
  & > * {
    display: inline-block;
  }
  & > * + * {
    margin-left: 15px;
  }
`

const Toolbar = styled(Menu)`
  position: relative;
  border-bottom: 2px solid #eee;
  margin-bottom: 20px;
`

export function SlateToolbar() {
  return (
    <Toolbar>
      {ToolbarButtons.map((buttonProps: ToolbarButtonProps, idx: number) => (
        <SlateToolbarButton key={idx} {...buttonProps} />
      ))}
    </Toolbar>
  )
}
