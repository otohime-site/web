import firebase from 'firebase/app'
import 'firebase/auth'
import { ThemeProvider as EMThemeProvider } from 'emotion-theming'
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createClient, Provider as UrqlProvider } from 'urql'
import { makeOperation } from '@urql/core'
import { authExchange } from '@urql/exchange-auth'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider, StylesProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import { purple, lime } from '@material-ui/core/colors'
import App from './App'
import firebaseConfig from './firebase'

firebase.initializeApp(firebaseConfig)
firebase.auth().getRedirectResult().then(() => {}, () => {})

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: lime
  }

})

const graphqlClient = createClient({
  url: '/graphql',
  exchanges: [
    authExchange({
      getAuth: async () => {
        const user = firebase.auth().currentUser
        if (user == null) {
          return null
        }
        const token = await user.getIdToken()
        return { token }
      },
      addAuthToOperation: ({ authState, operation }) => {
        if (authState == null || authState.token == null) {
          return operation
        }
        const fetchOptions = typeof operation.context.fetchOptions === 'function'
          ? operation.context.fetchOptions()
          : operation.context.fetchOptions ??
          { }
        return makeOperation(operation.kind, operation, {
          ...operation.context,
          fetchOptions: {
            ...fetchOptions,
            headers: {
              ...fetchOptions.headers,
              Authorization: `Bearer ${authState.token}`
            }
          }
        })
      }
    })
  ]
})
const root = document.getElementById('root')
render(
  <UrqlProvider value={graphqlClient}>
    <BrowserRouter>
      <StylesProvider injectFirst={true}>
        <EMThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </EMThemeProvider>
      </StylesProvider>
    </BrowserRouter>
  </UrqlProvider>
  , root
)
