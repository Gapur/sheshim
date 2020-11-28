import React from 'react'
import { Button, Comment, Icon } from 'semantic-ui-react'

import { Comment as AnswerComment } from 'screens/home/mock'

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
      <Button basic size="mini">
        Add a comment
      </Button>
    </Comment.Group>
  )
}
