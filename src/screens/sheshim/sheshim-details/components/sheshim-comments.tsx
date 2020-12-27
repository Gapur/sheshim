import React, { useState } from 'react'
import { Comment, Icon } from 'semantic-ui-react'
import { useParams } from 'react-router-dom'
import moment from 'moment'

import { Comment as AnswerComment } from 'models'
import { createSheshimComment } from 'services/firebase'
import { fireSwalError } from 'utils/error-handler'
import { images } from 'assets'

import { SheshimCommentForm, FormValues } from './sheshim-comment-form'
import { SheshimDetailsParams } from '../sheshim-details'

interface SheshimCommentsProps {
  comments: AnswerComment[]
}

export function SheshimComments({ comments }: SheshimCommentsProps) {
  const [sheshimComments, setSheshimComments] = useState<AnswerComment[]>(comments)
  const { sheshimId } = useParams<SheshimDetailsParams>()

  const onCreateComment = (data: FormValues) =>
    createSheshimComment(sheshimId, data)
      .then((comment) => setSheshimComments(sheshimComments.concat(comment)))
      .catch(fireSwalError)

  return (
    <Comment.Group>
      <Comment.Group>
        {sheshimComments.map((comment: AnswerComment, idx: number) => (
          <Comment key={idx}>
            <Comment.Avatar src={images.user} />
            <Comment.Content>
              <Comment.Author as="a">{comment.createdBy.name}</Comment.Author>
              <Comment.Metadata>
                <div>{moment(comment.createdAt?.toDate()).format('lll')}</div>
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
