import React, { useState, useCallback, useMemo } from 'react'
import { Slate, Editable, withReact, RenderLeafProps } from 'slate-react'
import { Text, createEditor, Node as SlateNode, Range } from 'slate'
import { withHistory } from 'slate-history'
import styled, { css } from 'styled-components'
import Prism from 'prismjs'

import 'prismjs/components/prism-python'
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-java'

interface LeafSpanProps {
  [key: string]: unknown
}

const LeafSpan = styled.span<LeafSpanProps>`
  font-family: monospace;
  background: hsla(0, 0%, 100%, 0.5);

  ${(props) => {
    if (props.comment) {
      return css`
        color: slategray;
      `
    }
    if (props.operator || props.url) {
      return css`
        color: #9a6e3a;
      `
    }
    if (props.keyword) {
      return css`
        color: #07a;
      `
    }
    if (props.variable || props.regex) {
      return css`
        color: #e90;
      `
    }
    if (props.number || props.boolean || props.tag || props.constant || props.symbol || props.attr || props.selector) {
      return css`
        color: #999;
      `
    }
    if (props.punctuation) {
      return css`
        color: #999;
      `
    }
    if (props.string || props.char) {
      return css`
        color: #690;
      `
    }
    if (props.function || props.class) {
      return css`
        color: #dd4a68;
      `
    }
  }}
`

const getLength = (token: string | Prism.Token): number => {
  if (typeof token === 'string') {
    return token.length
  } else if (typeof token.content === 'string') {
    return token.content.length
  } else {
    return (token.content as (string | Prism.Token)[]).reduce(
      (l: number, t: string | Prism.Token) => l + getLength(t),
      0,
    )
  }
}

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  return <span {...attributes}>{children}</span>
}

const initialValue = [
  {
    children: [
      {
        text: '<h1>Hi!</h1>',
      },
    ],
  },
]

export function CodeEditor() {
  const [value, setValue] = useState<SlateNode[]>(initialValue)
  const [language, setLanguage] = useState('html')
  const renderLeaf = useCallback((props) => <Leaf {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  // decorate function depends on the language selected
  const decorate = useCallback(
    ([node, path]) => {
      const ranges: Range[] = []
      if (!Text.isText(node)) {
        return ranges
      }
      const tokens = Prism.tokenize(node.text, Prism.languages[language])
      let start = 0

      for (const token of tokens) {
        const length = getLength(token)
        const end = start + length

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
    [language],
  )

  return (
    <Slate editor={editor} value={value} onChange={setValue}>
      <div contentEditable={false} style={{ position: 'relative', top: '5px', right: '5px' }}>
        <h3>
          Select a language
          <select value={language} style={{ float: 'right' }} onChange={(e) => setLanguage(e.target.value)}>
            <option value="js">JavaScript</option>
            <option value="css">CSS</option>
            <option value="html">HTML</option>
            <option value="python">Python</option>
            <option value="sql">SQL</option>
            <option value="java">Java</option>
            <option value="php">PHP</option>
          </select>
        </h3>
      </div>
      <Editable decorate={decorate} renderLeaf={renderLeaf} placeholder="Write some code..." />
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

// Prism.languages.markdown.bold.inside.url = Prism.util.clone(
//   Prism.languages.markdown.url
// )
// Prism.languages.markdown.italic.inside.url = Prism.util.clone(
//   Prism.languages.markdown.url
// )
// Prism.languages.markdown.bold.inside.italic = Prism.util.clone(
//   Prism.languages.markdown.italic
// )
// Prism.languages.markdown.italic.inside.bold = Prism.util.clone(Prism.languages.markdown.bold);
