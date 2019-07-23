import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { BrowserRouter } from 'react-router-dom'
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
const root = document.getElementById('root')
render(
  (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  ), root
)
