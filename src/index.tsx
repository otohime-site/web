import firebase from 'firebase/app'
import 'firebase/auth'
import { ThemeProvider as EMThemeProvider } from 'emotion-theming'
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider, StylesProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import { pink, orange } from '@material-ui/core/colors'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import GraphQLProvider from './GraphQLProvider'
import firebaseConfig from './firebase'

firebase.initializeApp(firebaseConfig)
firebase.auth().getRedirectResult().then(() => {}, () => {})

const theme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: orange
  }

})

const root = document.getElementById('root')
render(
  <BrowserRouter>
    <HelmetProvider>
      <StylesProvider injectFirst={true}>
        <EMThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <GraphQLProvider>
              <CssBaseline />
              <App />
            </GraphQLProvider>
          </ThemeProvider>
        </EMThemeProvider>
      </StylesProvider>
    </HelmetProvider>
  </BrowserRouter>
  , root
)
