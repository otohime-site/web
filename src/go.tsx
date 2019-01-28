import React from 'react'
import { render } from 'react-dom'
import Book from './Book'

const root = document.createElement('div')
root.setAttribute('id', 'smq-root')
document.body.appendChild(root)

render(
  (
    <Book />
  ), root
)
