import React from 'react'
import ReactDOM from 'react-dom'
import SeedlingSummary from './SeedlingSummary'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme(
  {
    "palette": {
      "primary1Color": "#4caf50",
      "primary2Color": "#689f38",
      "accent1Color": "#b2ff59",
      "pickerHeaderColor": "#009688"
    },
    "textField": {
      "errorColor": "#ff5722"
    }
  });

const price = 18.01;
const seed = 'carrot';

// eslint-disable-next-line
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
      <SeedlingSummary price={price} seed={seed} />
    </MuiThemeProvider>, div)
})
