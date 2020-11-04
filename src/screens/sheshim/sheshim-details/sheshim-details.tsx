import React from 'react'
import { Header } from 'semantic-ui-react'
import { useParams } from 'react-router-dom'

import { AppLayout } from '../../../components'
import { CodeEditor } from './components/code-editor'
import { data } from '../../home/mock'

interface SheshimDetailsParams {
  sheshimId: string
}

export function SheshimDetails() {
  const { sheshimId } = useParams<SheshimDetailsParams>()

  const sheshim = data.find((item) => String(item.id) === sheshimId)

  if (!sheshim) {
    return <div>Loading</div>
  }

  return (
    <AppLayout page="sheshim">
      <Header>{sheshim.title}</Header>

      <CodeEditor initialValue={sheshim.body} />
    </AppLayout>
  )
}
