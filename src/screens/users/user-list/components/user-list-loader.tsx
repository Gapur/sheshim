import React from 'react'
import { Table, Placeholder } from 'semantic-ui-react'

const ROW_LIST = Array(4).fill(null)

export function UserListLoader() {
  return (
    <React.Fragment>
      {ROW_LIST.map((_, idx: number) => (
        <Table.Row key={idx}>
          <Table.Cell>
            <Placeholder style={{ height: 36 }}>
              <Placeholder.Header image>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
            </Placeholder>
          </Table.Cell>
          <Table.Cell>
            <Placeholder style={{ height: 32 }}>
              <Placeholder.Image />
            </Placeholder>
          </Table.Cell>
          <Table.Cell>
            <Placeholder style={{ height: 32 }}>
              <Placeholder.Image />
            </Placeholder>
          </Table.Cell>
          <Table.Cell>
            <Placeholder style={{ height: 32 }}>
              <Placeholder.Image />
            </Placeholder>
          </Table.Cell>
        </Table.Row>
      ))}
    </React.Fragment>
  )
}
