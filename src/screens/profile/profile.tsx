import React, { useState, useEffect } from 'react'
import { Header } from 'semantic-ui-react'

import { AppLayout } from 'components'

import { ProfileForm } from './components/profile-form'

interface DropzoneFile extends File {
  preview: string
}

export function Profile() {
  const [files, setFiles] = useState<DropzoneFile[]>([])

  useEffect(() => {
    files.forEach((file) => URL.revokeObjectURL(file.preview))
  }, [files])

  return (
    <AppLayout page="profile">
      <Header>Profile</Header>

      <ProfileForm />
    </AppLayout>
  )
}
