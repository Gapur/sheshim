import React, { PropsWithChildren } from 'react'
import { useSlate } from 'slate-react'
import { Editor, Transforms } from 'slate'
import { Icon, SemanticICONS } from 'semantic-ui-react'
import styled from 'styled-components'

import { SlateElementType, SLATE_LIST_TYPES } from './slate-element'

interface BaseProps {
  [key: string]: unknown
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

export function SlateToolbar(props: PropsWithChildren<BaseProps>) {
  const toggleBlock = (editor: Editor, format: SlateElementType) => {
    const isActive = isBlockActive(editor, format)
    const isList = SLATE_LIST_TYPES.includes(format)

    Transforms.unwrapNodes(editor, {
      match: (n) => SLATE_LIST_TYPES.includes(n.type as SlateElementType),
      split: true,
    })

    Transforms.setNodes(editor, {
      type: isActive ? 'paragraph' : isList ? SlateElementType.LIST_ITEM : format,
    })

    if (!isActive && isList) {
      const block = { type: format, children: [] }
      Transforms.wrapNodes(editor, block)
    }
  }

  const toggleMark = (editor: Editor, format: SlateElementType) => {
    const isActive = isMarkActive(editor, format)

    if (isActive) {
      Editor.removeMark(editor, format)
    } else {
      Editor.addMark(editor, format, true)
    }
  }

  const isBlockActive = (editor: Editor, format: SlateElementType) => {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === format,
    })

    return Boolean(match)
  }

  const isMarkActive = (editor: Editor, format: SlateElementType) => {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
  }

  const BlockButton = ({ format, icon }: { format: SlateElementType; icon: SemanticICONS }) => {
    const editor = useSlate()
    return (
      <Button
        active={isBlockActive(editor, format)}
        onMouseDown={(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
          event.preventDefault()
          toggleBlock(editor, format)
        }}
      >
        <Icon name={icon} />
      </Button>
    )
  }

  const MarkButton = ({ format, icon }: { format: SlateElementType; icon: SemanticICONS }) => {
    const editor = useSlate()
    return (
      <Button
        active={isMarkActive(editor, format)}
        onMouseDown={(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
          event.preventDefault()
          toggleMark(editor, format)
        }}
      >
        <Icon name={icon} />
      </Button>
    )
  }

  return (
    <Toolbar>
      <MarkButton format={SlateElementType.BOLD} icon="bold" />
      <MarkButton format={SlateElementType.ITALIC} icon="italic" />
      <MarkButton format={SlateElementType.UNDERLINE} icon="underline" />
      <MarkButton format={SlateElementType.CODE} icon="code" />
      <BlockButton format={SlateElementType.HEADING_ONE} icon="heading" />
      <BlockButton format={SlateElementType.HEADING_TWO} icon="text height" />
      <BlockButton format={SlateElementType.BLOCK_QUOTE} icon="quote left" />
      <BlockButton format={SlateElementType.NUMBERED_LIST} icon="numbered list" />
      <BlockButton format={SlateElementType.BULLETED_LIST} icon="unordered list" />
    </Toolbar>
  )
}
