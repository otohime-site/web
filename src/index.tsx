import React from 'react'
import { render } from 'react-dom'
import { StoreContext } from 'redux-react-hook'
import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import { createEpicMiddleware } from 'redux-observable'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import rootReducer from './reducers'
import rootEpics from './epics'
import { LaundryAction, LaundryState } from './laundry/reducers'

const epicMiddleware = createEpicMiddleware<LaundryAction, LaundryAction, LaundryState>()
const composedCreateStore = applyMiddleware(
  promiseMiddleware(),
  epicMiddleware
)(createStore)
const store = composedCreateStore(rootReducer)
epicMiddleware.run(rootEpics)
const root = document.getElementById('root')
render(
  (
    <StoreContext.Provider value={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StoreContext.Provider>
  ), root
)
