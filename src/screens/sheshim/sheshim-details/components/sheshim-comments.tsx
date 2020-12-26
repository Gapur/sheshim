import React from 'react'
import { Comment, Icon } from 'semantic-ui-react'
import { useParams } from 'react-router-dom'

import { Comment as AnswerComment } from 'models'
import { createSheshimComment } from 'services/firebase'
import { fireSwalError } from 'utils/error-handler'

import { SheshimCommentForm, FormValues } from './sheshim-comment-form'
import { SheshimDetailsParams } from '../sheshim-details'

interface SheshimCommentsProps {
  comments: AnswerComment[]
}

export function SheshimComments({ comments }: SheshimCommentsProps) {
  const { sheshimId } = useParams<SheshimDetailsParams>()

  const onCreateComment = (data: FormValues) =>
    createSheshimComment(sheshimId, data).catch(fireSwalError)

  return (
    <Comment.Group>
      <Comment.Group>
        {comments.map((comment: AnswerComment) => (
          <Comment key={comment.id}>
            <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" />
            <Comment.Content>
              <Comment.Author as="a">{comment.createdBy.name}</Comment.Author>
              <Comment.Metadata>
                <div>{comment.createdAt}</div>
                <div>
                  <Icon name="star" />
                  {comment.votes}
                </div>
              </Comment.Metadata>
              <Comment.Text>{comment.text}</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Like</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>
        ))}
      </Comment.Group>
      <SheshimCommentForm onSubmit={onCreateComment} />
    </Comment.Group>
  )
}
