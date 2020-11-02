import React from 'react'
import { Header } from 'semantic-ui-react'

import { AppLayout } from '../../../components'
import { CodeEditor } from './components/code-editor'

export function SheshimDetails() {
  return (
    <AppLayout page="sheshim">
      <Header>Sheshim Details</Header>

      <CodeEditor />
    </AppLayout>
  )
}
