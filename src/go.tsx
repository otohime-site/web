import emotionReset from 'emotion-reset'
import React from 'react'
import { render } from 'react-dom'
import styled from './styled'
import Book from './Book'

const root = document.createElement('div')
root.setAttribute('id', 'smq-root')
document.body.appendChild(root)

const ResetBook = styled(Book)`
  ${emotionReset}
`

render(
  (
    <ResetBook />
  ), root
)
