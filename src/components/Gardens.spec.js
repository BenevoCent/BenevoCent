import React from 'react'
import ReactDOM from 'react-dom'
import Gardens from './Gardens'
import { GridList, GridTile } from 'material-ui/GridList';

// eslint-disable-next-line
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Gardens />, div)
})
