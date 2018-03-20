import React from 'react';
import ReactDOM from 'react-dom';
import App from './components';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
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


ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
);
registerServiceWorker();
