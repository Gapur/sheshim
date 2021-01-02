import React from 'react'
import { Form, Placeholder, Header } from 'semantic-ui-react'

import { AppLayout } from 'components'

export function ProfileLoader() {
  return (
    <AppLayout page="profile">
      <Header>Profile</Header>

      <Form>
        <Placeholder style={{ height: 150, width: 150, margin: '24px auto' }}>
          <Placeholder.Image />
        </Placeholder>

        <Form.Group widths="equal">
          <Form.Field>
            <Placeholder fluid style={{ height: 36 }}>
              <Placeholder.Image />
            </Placeholder>
          </Form.Field>
          <Form.Field>
            <Placeholder fluid style={{ height: 36 }}>
              <Placeholder.Image />
            </Placeholder>
          </Form.Field>
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Field>
            <Placeholder fluid style={{ height: 36 }}>
              <Placeholder.Image />
            </Placeholder>
          </Form.Field>
          <Form.Field>
            <Placeholder fluid style={{ height: 36 }}>
              <Placeholder.Image />
            </Placeholder>
          </Form.Field>
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Field>
            <Placeholder fluid style={{ height: 36 }}>
              <Placeholder.Image />
            </Placeholder>
          </Form.Field>
          <Form.Field>
            <Placeholder fluid style={{ height: 36 }}>
              <Placeholder.Image />
            </Placeholder>
          </Form.Field>
        </Form.Group>
      </Form>
    </AppLayout>
  )
}
