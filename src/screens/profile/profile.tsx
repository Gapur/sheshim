import React, { useEffect, useState } from 'react'
import { Header } from 'semantic-ui-react'
import Swal from 'sweetalert2'

import { AppLayout, NotFound } from 'components'
import { User } from 'models'
import { getProfile, updateProfile } from 'services/firebase/user'
import { fireSwalError } from 'utils/error-handler'

import { FormValues, ProfileForm } from './components/profile-form'
import { ProfileLoader } from './components/profile-loader'

export function Profile() {
  const [profile, setProfile] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProfile()
      .then(setProfile)
      .catch(fireSwalError)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <ProfileLoader />
  }

  if (!profile) {
    return <NotFound />
  }

  const onUpdateProfile = (data: FormValues) =>
    updateProfile(profile.id as string, data)
      .then(() =>
        Swal.fire({
          icon: 'success',
          title: 'You have successfully updated your profile.',
        }),
      )
      .catch(fireSwalError)

  return (
    <AppLayout page="profile">
      <Header>Profile</Header>

      <ProfileForm profile={profile} onSubmit={onUpdateProfile} />
    </AppLayout>
  )
}
