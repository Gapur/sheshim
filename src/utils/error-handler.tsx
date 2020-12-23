import Swal from 'sweetalert2'

import { firebase } from 'services/firebase'

export const fireSwalError = (err: firebase.FirebaseError) =>
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: err.message,
  })
