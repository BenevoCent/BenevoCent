import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// eslint-disable-next-line
it('renders without crashing', () => {
  const div = shallow(
    <Home />,
  )
})
