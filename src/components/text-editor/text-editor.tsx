import React, { useCallback, useMemo, useState } from 'react'
import { Editable, withReact, Slate } from 'slate-react'
import { createEditor, Node as SlateNode } from 'slate'
import { withHistory } from 'slate-history'

import { SlateToolbar } from './slate-toolbar'
import { SlateLeaf } from './slate-leaf'
import { SlateElement } from './slate-element'

interface TextEditorProps {
  initialValue?: SlateNode[]
  readonly?: boolean
}

export function TextEditor({ initialValue = [{ children: [{ text: '' }] }], readonly = false }: TextEditorProps) {
  const [slateValue, setSlateValue] = useState<SlateNode[]>(initialValue)
  const renderElement = useCallback((props) => <SlateElement {...props} />, [])
  const renderLeaf = useCallback((props) => <SlateLeaf {...props} />, [])
  const slateEditor = useMemo(() => withHistory(withReact(createEditor())), [])

  return (
    <Slate editor={slateEditor} value={slateValue} onChange={setSlateValue}>
      <SlateToolbar />
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
