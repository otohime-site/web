import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { BrowserRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider as SCThemeProvider } from 'styled-components'
import { ThemeProvider, StylesProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import { indigo, orange } from '@material-ui/core/colors'
import App from './App'
import rootReducer from './reducers'
import rootEpics from './epics'
import { LaundryAction, LaundryState } from './laundry/reducers'

const epicMiddleware = createEpicMiddleware<LaundryAction, LaundryAction, LaundryState>()
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
          <SCThemeProvider theme={theme}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <App />
            </ThemeProvider>
          </SCThemeProvider>
        </StylesProvider>
      </BrowserRouter>
    </Provider>
  ), root
)
