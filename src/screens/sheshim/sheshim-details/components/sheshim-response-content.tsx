import React from 'react'
import { Label } from 'semantic-ui-react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Node as SlateNode } from 'slate'
import moment from 'moment'

import { TextEditor, QuestionItem } from 'components'
import { colors } from 'theme'
import { Comment } from 'models'

import { SheshimComments } from './sheshim-comments'
import { FormValues } from './sheshim-comment-form'

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
  createdAt?: Date
  createdBy: string
  comments: Comment[]
  onAddComment: (data: FormValues) => Promise<Comment>
}

export function SheshimResponseContent({
  body,
  tags,
  createdAt,
  createdBy,
  comments,
  onAddComment,
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
        <span>{`asked ${moment(createdAt).fromNow()} by`}</span>&nbsp;
        <Link to="/users">{createdBy}</Link>
      </QuestionItem.Started>
      <SheshimComments comments={comments} onAddComment={onAddComment} />
    </ResponseContent>
  )
}
