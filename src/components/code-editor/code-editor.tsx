import React, { useState, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { Slate, Editable, withReact } from 'slate-react'
import { Text, createEditor, Node as SlateNode, Range } from 'slate'
import { withHistory } from 'slate-history'
import Prism from 'prismjs'

import 'prismjs/components/prism-python'
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-java'

import { colors } from 'theme'
import { SlateLeaf } from './slate-leaf'

interface CodeEditorProps {
  initialValue?: string
  readonly?: boolean
}

const StyledEditable = styled(Editable)`
  width: 100%;
  background: ${colors.whiteSmoke};
  margin-left: 8px;
  padding: 8px;
  border-radius: 4px;
`

export function CodeEditor({ initialValue = '', readonly = false }: CodeEditorProps) {
  const slateInitialValue = [{ children: [{ text: initialValue }] }]

  const [slateValue, setSlateValue] = useState<SlateNode[]>(slateInitialValue)
  const [language, setLanguage] = useState('html')
  const renderLeaf = useCallback((props) => <SlateLeaf {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  const getTokenSize = useCallback((token: string | Prism.Token): number => {
    if (typeof token === 'string') {
      return token.length
    } else if (typeof token.content === 'string') {
      return token.content.length
    } else {
      return (token.content as (string | Prism.Token)[]).reduce(
        (acc: number, curr: string | Prism.Token) => acc + getTokenSize(curr),
        0,
      )
    }
  }, [])

  const decorate = useCallback(
    ([node, path]) => {
      const ranges: Range[] = []
      if (!Text.isText(node)) {
        return ranges
      }
      const tokens = Prism.tokenize(node.text, Prism.languages[language])
      let start = 0

      for (const token of tokens) {
        const size = getTokenSize(token)
        const end = start + size

        if (typeof token !== 'string') {
          ranges.push({
            [token.type]: true,
            anchor: { path, offset: start },
            focus: { path, offset: end },
          })
        }

        start = end
      }

      return ranges
    },
    [language, getTokenSize],
  )

  return (
    <Slate editor={editor} value={slateValue} onChange={setSlateValue}>
      {!readonly && (
        <div style={{ position: 'relative', top: '5px', right: '5px' }}>
          <select value={language} style={{ float: 'right' }} onChange={(e) => setLanguage(e.target.value)}>
            <option value="js">JavaScript</option>
            <option value="css">CSS</option>
            <option value="html">HTML</option>
            <option value="python">Python</option>
            <option value="sql">SQL</option>
            <option value="java">Java</option>
            <option value="php">PHP</option>
          </select>
        </div>
      )}
      <StyledEditable
        decorate={decorate}
        readOnly={readonly}
        renderLeaf={renderLeaf}
        placeholder="Write some code..."
      />
    </Slate>
  )
}

// modifications and additions to prism library

Prism.languages.python = Prism.languages.extend('python', {})
Prism.languages.insertBefore('python', 'prolog', { comment: { pattern: /##[^\n]*/, alias: 'comment' } }, {})
Prism.languages.javascript = Prism.languages.extend('javascript', {})
Prism.languages.insertBefore('javascript', 'prolog', { comment: { pattern: /\/\/[^\n]*/, alias: 'comment' } }, {})
Prism.languages.html = Prism.languages.extend('html', {})
Prism.languages.insertBefore('html', 'prolog', { comment: { pattern: /<!--[^\n]*-->/, alias: 'comment' } }, {})
Prism.languages.markdown = Prism.languages.extend('markup', {})
Prism.languages.insertBefore(
  'markdown',
  'prolog',
  {
    blockquote: { pattern: /^>(?:[\t ]*>)*/m, alias: 'punctuation' },
    code: [
      { pattern: /^(?: {4}|\t).+/m, alias: 'keyword' },
      { pattern: /``.+?``|`[^`\n]+`/, alias: 'keyword' },
    ],
    title: [
      {
        pattern: /\w+.*(?:\r?\n|\r)(?:==+|--+)/,
        alias: 'important',
        inside: { punctuation: /==+$|--+$/ },
      },
      {
        pattern: /(^\s*)#+.+/m,
        lookbehind: !0,
        alias: 'important',
        inside: { punctuation: /^#+|#+$/ },
      },
    ],
    hr: {
      pattern: /(^\s*)([*-])([\t ]*\2){2,}(?=\s*$)/m,
      lookbehind: !0,
      alias: 'punctuation',
    },
    list: {
      pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
      lookbehind: !0,
      alias: 'punctuation',
    },
    'url-reference': {
      pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
      inside: {
        variable: { pattern: /^(!?\[)[^\]]+/, lookbehind: !0 },
        string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
        punctuation: /^[\[\]!:]|[<>]/,
      },
      alias: 'url',
    },
    bold: {
      pattern: /(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
      lookbehind: !0,
      inside: { punctuation: /^\*\*|^__|\*\*$|__$/ },
    },
    italic: {
      pattern: /(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
      lookbehind: !0,
      inside: { punctuation: /^[*_]|[*_]$/ },
    },
    url: {
      pattern: /!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,
      inside: {
        variable: { pattern: /(!?\[)[^\]]+(?=\]$)/, lookbehind: !0 },
        string: { pattern: /"(?:\\.|[^"\\])*"(?=\)$)/ },
      },
    },
  },
  {},
)
