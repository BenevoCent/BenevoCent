import React from 'react'
import ReactDOM from 'react-dom'
import Gardens from './Gardens'

// eslint-disable-next-line
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Gardens />, div)
})
