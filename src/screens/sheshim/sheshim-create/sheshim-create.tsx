import React from 'react'
import { Icon } from 'semantic-ui-react'
import styled from 'styled-components'
import { Blob } from 'react-blob'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'

import { AppLayout } from 'components'
import { colors } from 'theme'
import { createSheshim } from 'services/firebase/sheshim'
import { fireSwalError } from 'utils/error-handler'

import { SheshimForm, FormValues } from './components/sheshim-form'

const Container = styled.div`
  width: 72%;
`

const HeaderBlob = styled(Blob)`
  font-size: 1.5em;
  background-color: ${colors.lightSkyBlue};
  color: ${colors.white};
`

const ReactBlob = styled(Blob)`
  position: absolute;
  top: -4%;
  right: -8%;
  background-color: ${colors.lightSkyBlue};
  color: ${colors.white};
  opacity: 0.8;
  font-size: 32vh;

  .react.icon {
    height: auto;
  }
`

export function SheshimCreate() {
  const history = useHistory()

  const onSubmit = (data: FormValues) =>
    createSheshim(data)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'You have successfully created a question.',
        }).then(() => history.push('/sheshim'))
      })
      .catch(fireSwalError)

  return (
    <AppLayout page="sheshim">
      <HeaderBlob size="8em">Ask a question</HeaderBlob>
      <ReactBlob size="64vh" animationDuration="60s">
        <Icon name="react" />
      </ReactBlob>
      <Container>
        <SheshimForm onSubmit={onSubmit} />
      </Container>
    </AppLayout>
  )
}
