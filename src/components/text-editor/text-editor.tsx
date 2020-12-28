import React, { useCallback, useMemo } from 'react'
import { Editable, withReact, Slate } from 'slate-react'
import { createEditor, Node as SlateNode } from 'slate'
import { withHistory } from 'slate-history'
import styled from 'styled-components'

import { colors } from 'theme'

import { SlateToolbar } from './slate-toolbar'
import { SlateLeaf } from './slate-leaf'
import { SlateElement } from './slate-element'

export const INITIAL_EDITOR_VALUE: SlateNode[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
]

interface TextEditorProps {
  value?: SlateNode[]
  readonly?: boolean
  placeholder?: string
  onChange?: (value: SlateNode[]) => void
}

const Editor = styled.div`
  background: ${colors.whiteSmoke};
  padding: 12px;
  margin-bottom: 8px;
`

export function TextEditor({
  value = INITIAL_EDITOR_VALUE,
  readonly = false,
  placeholder = 'Enter some text...',
  onChange = () => value,
}: TextEditorProps) {
  const renderElement = useCallback((props) => <SlateElement {...props} />, [])
  const renderLeaf = useCallback((props) => <SlateLeaf {...props} />, [])
  const slateEditor = useMemo(() => withHistory(withReact(createEditor())), [])

  const renderEditor = () => {
    if (readonly) {
      return <Editable readOnly renderElement={renderElement} renderLeaf={renderLeaf} />
    }
    return (
      <Editor>
        <SlateToolbar />
        <Editable
          readOnly={readonly}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder={placeholder}
          spellCheck
          autoFocus
        />
      </Editor>
    )
  }

  return (
    <Slate editor={slateEditor} value={value} onChange={onChange}>
      {renderEditor()}
    </Slate>
  )
}
