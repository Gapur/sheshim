import React from 'react'
import { Label } from 'semantic-ui-react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Node as SlateNode } from 'slate'

import { TextEditor, QuestionItem } from 'components'
import { colors } from 'theme'
import { Comment } from 'models'

import { SheshimComments } from './sheshim-comments'

const ResponseContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 8px;
  margin-right: 8px;
  margin-bottom: 8px;
`

const ResponseBody = styled.div`
  background: ${colors.whiteSmoke};
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
`

interface SheshimResponseContentProps {
  body: SlateNode[]
  tags?: string[]
  createdAt: string
  createdBy: string
  comments: Comment[]
}

export function SheshimResponseContent({
  body,
  tags,
  createdAt,
  createdBy,
  comments,
}: SheshimResponseContentProps) {
  return (
    <ResponseContent>
      <ResponseBody>
        <TextEditor value={body} readonly />
      </ResponseBody>
      {tags && (
        <Label.Group color="blue">
          {tags.map((tag, idx) => (
            <Label as="a" key={idx}>
              {tag}
            </Label>
          ))}
        </Label.Group>
      )}
      <QuestionItem.Started>
        <span>{createdAt}</span>&nbsp;
        <Link to="/users">{createdBy}</Link>
      </QuestionItem.Started>
      <SheshimComments comments={comments} />
    </ResponseContent>
  )
}
