import React from 'react'
import { Divider, Placeholder } from 'semantic-ui-react'

import { AppLayout } from 'components'

export function SheshimDetailsLoader() {
  return (
    <AppLayout page="sheshim">
      <Placeholder>
        <Placeholder.Header>
          <Placeholder.Line length="medium" />
          <Placeholder.Line length="long" />
          <Placeholder.Line length="full" />
        </Placeholder.Header>
      </Placeholder>

      <Divider />

      <Placeholder fluid style={{ width: '72%' }}>
        <Placeholder.Header>
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Header>
        <Placeholder.Image />
        <Placeholder.Image />
        <Placeholder.Image />
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
      </Placeholder>
    </AppLayout>
  )
}
