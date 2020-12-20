import React from 'react'
import { Comment, Icon } from 'semantic-ui-react'

import { Comment as AnswerComment } from 'models'

import { SheshimCommentForm } from './sheshim-comment-form'

interface SheshimCommentsProps {
  comments: AnswerComment[]
}

export function SheshimComments({ comments }: SheshimCommentsProps) {
  return (
    <Comment.Group>
      <Comment.Group>
        {comments.map((comment: AnswerComment) => (
          <Comment key={comment.id}>
            <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" />
            <Comment.Content>
              <Comment.Author as="a">{comment.createdBy}</Comment.Author>
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
      <SheshimCommentForm />
    </Comment.Group>
  )
}
