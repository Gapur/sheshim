import React from 'react'
import { Header } from 'semantic-ui-react'

import { AppLayout } from 'components'

import { ProfileForm } from './components/profile-form'

export function Profile() {
  return (
    <AppLayout page="profile">
      <Header>Profile</Header>

      <ProfileForm />
    </AppLayout>
  )
}
