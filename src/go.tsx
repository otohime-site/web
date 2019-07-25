import React from 'react'
import { render } from 'react-dom'
import Book from './Book'
import { Reset } from 'styled-reset'

const root = document.createElement('div')
root.setAttribute('id', 'smq-root')
document.body.appendChild(root)

render(
  (
    <React.Fragment>
      <Reset />
      <Book />
    </React.Fragment>
  ), root
)
