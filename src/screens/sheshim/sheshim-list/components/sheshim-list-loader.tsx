import React from 'react'
import { Segment, Placeholder } from 'semantic-ui-react'

export function SheshimListLoader() {
  return (
    <React.Fragment>
      <Segment color="yellow">
        <Placeholder fluid>
          <Placeholder.Image />
        </Placeholder>
      </Segment>
      <Segment color="yellow">
        <Placeholder fluid>
          <Placeholder.Image />
        </Placeholder>
      </Segment>
      <Segment color="yellow">
        <Placeholder fluid>
          <Placeholder.Image />
        </Placeholder>
      </Segment>
      <Segment color="yellow">
        <Placeholder fluid>
          <Placeholder.Image />
        </Placeholder>
      </Segment>
    </React.Fragment>
  )
}
