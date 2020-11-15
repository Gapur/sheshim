import React, { useCallback, useMemo, useState } from 'react'
import { Editable, withReact, useSlate, Slate } from 'slate-react'
import { Editor, Transforms, createEditor, Node as SlateNode } from 'slate'
import { withHistory } from 'slate-history'
import { Icon, SemanticICONS } from 'semantic-ui-react'

import { Button } from './button'
import { Toolbar } from './toolbar'
import { SlateLeaf } from './slate-leaf'
import { SlateElement, SlateElementType } from './slate-element'

const LIST_TYPES = ['numbered-list', 'bulleted-list']

interface TextEditorProps {
  initialValue: SlateNode[]
  readonly?: boolean
}

export const TextEditor = ({ initialValue, readonly = false }: TextEditorProps) => {
  const [value, setValue] = useState<SlateNode[]>(initialValue)
  const renderElement = useCallback((props) => <SlateElement {...props} />, [])
  const renderLeaf = useCallback((props) => <SlateLeaf {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  return (
    <Slate editor={editor} value={value} onChange={setValue}>
      <Toolbar>
        <MarkButton format={SlateElementType.BOLD} icon="bold" />
        <MarkButton format={SlateElementType.ITALIC} icon="italic" />
        <MarkButton format={SlateElementType.UNDERLINE} icon="underline" />
        <MarkButton format={SlateElementType.CODE} icon="code" />
        <BlockButton format={SlateElementType.HEADING_ONE} icon="heading" />
        <BlockButton format={SlateElementType.HEADING_TWO} icon="heading" />
        <BlockButton format={SlateElementType.BLOCK_QUOTE} icon="quote left" />
        <BlockButton format={SlateElementType.NUMBERED_LIST} icon="numbered list" />
        <BlockButton format={SlateElementType.BULLETED_LIST} icon="unordered list" />
      </Toolbar>
      <Editable
        readOnly={readonly}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some text..."
        spellCheck
        autoFocus
      />
    </Slate>
  )
}

const toggleBlock = (editor: Editor, format: SlateElementType) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: (n) => LIST_TYPES.includes(n.type as string),
    split: true,
  })

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
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
      onMouseDown={(event: Event) => {
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
      onMouseDown={(event: Event) => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      <Icon name={icon} />
    </Button>
  )
}
