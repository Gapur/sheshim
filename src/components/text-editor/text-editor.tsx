import React, { useCallback, useMemo, useState } from 'react'
import { Editable, withReact, Slate } from 'slate-react'
import { createEditor, Node as SlateNode } from 'slate'
import { withHistory } from 'slate-history'
import styled from 'styled-components'

import { colors } from 'theme'

import { SlateToolbar } from './slate-toolbar'
import { SlateLeaf } from './slate-leaf'
import { SlateElement } from './slate-element'

interface TextEditorProps {
  initialValue?: SlateNode[]
  readonly?: boolean
}

const Editor = styled.div`
  background: ${colors.whiteSmoke};
  padding: 12px;
  margin-bottom: 8px;
`

export function TextEditor({ initialValue = [{ children: [{ text: '' }] }], readonly = false }: TextEditorProps) {
  const [slateValue, setSlateValue] = useState<SlateNode[]>(initialValue)
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
          placeholder="Enter some text..."
          spellCheck
          autoFocus
        />
      </Editor>
    )
  }

  return (
    <Slate editor={slateEditor} value={slateValue} onChange={setSlateValue}>
      {renderEditor()}
    </Slate>
  )
}
