import React from 'react'
import ReactDOM from 'react-dom'
import Seedlings from './Seedlings'

// eslint-disable-next-line
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Seedlings />, div)
})
