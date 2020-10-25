import { ThemeProvider as EMThemeProvider } from 'emotion-theming'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { BrowserRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider, StylesProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import { indigo, orange } from '@material-ui/core/colors'
import App from './App'
import rootEpics from './epics'
import rootReducer, { RootAction, RootState } from './reducers'

const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState>()
const composedCreateStore = applyMiddleware(
  epicMiddleware
)(createStore)
const store = composedCreateStore(rootReducer)
epicMiddleware.run(rootEpics)

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: orange
  }

})

const root = document.getElementById('root')
render(
  (
    <Provider store={store}>
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
    </Provider>
  ), root
)
