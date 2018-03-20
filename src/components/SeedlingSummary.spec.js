import React from 'react'
import ReactDOM from 'react-dom'
import SeedlingSummary from './SeedlingSummary'

// eslint-disable-next-line
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<SeedlingSummary />, div)
})
