import React from 'react'
import { Button } from 'semantic-ui-react'

interface SheshimButtonControlProps {
  votes: number
  voting: boolean
  onUpdate: (votes: number) => void
}

export function SheshimButtonControl({ votes, voting, onUpdate }: SheshimButtonControlProps) {
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
