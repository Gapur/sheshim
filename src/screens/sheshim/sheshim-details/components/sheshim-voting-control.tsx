import React from 'react'
import { Button } from 'semantic-ui-react'

interface SheshimVotingControlProps {
  votes: number
  voting: boolean
  onUpdate: (votes: number) => void
}

export function SheshimVotingControl({ votes, voting, onUpdate }: SheshimVotingControlProps) {
  return (
    <div>
      <Button.Group size="mini" vertical>
        <Button icon="angle up" disabled={voting} onClick={() => onUpdate(votes + 1)} />
        <Button>{votes}</Button>
        <Button icon="angle down" disabled={voting} onClick={() => onUpdate(votes - 1)} />
      </Button.Group>
    </div>
  )
}
