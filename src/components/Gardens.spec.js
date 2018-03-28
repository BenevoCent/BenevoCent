import React, { Component } from "react";
import ReactDOM from 'react-dom'

import Carousel from "nuka-carousel";
import GardenGrid from "./GardenGrid";
import Gardens from "./Gardens";

import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

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


// eslint-disable-next-line
it('renders without crashing', () => {
  const div = shallow(
    <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
      <Gardens user={{ uid: "123" }} />
    </MuiThemeProvider>,
  )
})
