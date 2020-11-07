import firebase from 'firebase/app'
import 'firebase/auth'
import { ThemeProvider as EMThemeProvider } from 'emotion-theming'
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider, StylesProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import { pink, lime } from '@material-ui/core/colors'
import App from './App'
import GraphQLProvider from './GraphQLProvider'
import firebaseConfig from './firebase'

firebase.initializeApp(firebaseConfig)
firebase.auth().getRedirectResult().then(() => {}, () => {})

const theme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: lime
  }

})

const root = document.getElementById('root')
render(
  <GraphQLProvider>
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
  </GraphQLProvider>
  , root
)
