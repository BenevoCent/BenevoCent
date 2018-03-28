import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {StripeProvider} from 'react-stripe-elements';


const muiTheme = getMuiTheme(
  {
    "palette": {
        "primary1Color": "#382a19",
        "primary2Color": "#689f38",
        "accent1Color": "#b2ff59",
        "pickerHeaderColor": "#009688"
    },
    "textField": {
        "errorColor": "#ff5722"
    }
});


ReactDOM.render(
  <StripeProvider apiKey="pk_test_7NDxNFwTXZI5iGsCursLGPh2">
    <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
      <App />
    </MuiThemeProvider>
  </StripeProvider>,
  document.getElementById('root')
);
registerServiceWorker();
