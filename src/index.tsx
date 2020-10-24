import React from 'react'
import ReactDOM from 'react-dom'

import { App } from './app'
import { AppProviders } from './context'
import { GlobalStyle } from './theme'
import * as serviceWorker from './service-worker'

import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <GlobalStyle />
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
