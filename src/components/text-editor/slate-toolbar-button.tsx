import React from 'react'
import { useSlate } from 'slate-react'
import { Editor, Transforms } from 'slate'
import { Icon, SemanticICONS } from 'semantic-ui-react'
import styled from 'styled-components'

import { SlateElementType, SLATE_LIST_TYPES } from './slate-element'

export enum ToolbarButtonType {
  MARK,
  BLOCK,
}

export interface ToolbarButtonProps {
  type: ToolbarButtonType
  format: SlateElementType
  icon: SemanticICONS
}

interface ButtonProps {
  active?: boolean
  reversed?: boolean
  onMouseDown?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
}

const Button = styled.span<ButtonProps>`
  cursor: pointer;
  color: ${(props) => (props.reversed ? (props.active ? 'white' : '#aaa') : props.active ? 'black' : '#ccc')};
`

export function SlateToolbarButton({ type, format, icon }: ToolbarButtonProps) {
  const editor = useSlate()

  const toggleBlock = (blockEditor: Editor, blockFormat: SlateElementType) => {
    const isActive = isBlockActive(blockEditor, blockFormat)
    const isList = SLATE_LIST_TYPES.includes(blockFormat)

    Transforms.unwrapNodes(blockEditor, {
      match: (n) => SLATE_LIST_TYPES.includes(n.type as SlateElementType),
      split: true,
    })

    Transforms.setNodes(blockEditor, {
      type: isActive ? 'paragraph' : isList ? SlateElementType.LIST_ITEM : blockFormat,
    })

    if (!isActive && isList) {
      const block = { type: blockFormat, children: [] }
      Transforms.wrapNodes(blockEditor, block)
    }
  }

  const toggleMark = (markEditor: Editor, markFormat: SlateElementType) => {
    const isActive = isMarkActive(editor, markFormat)

    if (isActive) {
      Editor.removeMark(markEditor, markFormat)
    } else {
      Editor.addMark(markEditor, markFormat, true)
    }
  }

  const isBlockActive = (blockEditor: Editor, blockFormat: SlateElementType) => {
    const [match] = Editor.nodes(blockEditor, {
      match: (n) => n.type === blockFormat,
    })

    return Boolean(match)
  }

  const isMarkActive = (markEditor: Editor, markFormat: SlateElementType) => {
    const marks = Editor.marks(markEditor)
    return marks ? marks[markFormat] === true : false
  }

  const isButtonActive = type === ToolbarButtonType.MARK ? isMarkActive : isBlockActive
  const toggleButton = type === ToolbarButtonType.MARK ? toggleMark : toggleBlock

  return (
    <Button
      active={isButtonActive(editor, format)}
      onMouseDown={(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        event.preventDefault()
        toggleButton(editor, format)
      }}
    >
      <Icon name={icon} />
    </Button>
  )
}
