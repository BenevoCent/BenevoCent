// Node Modules
import React, { Component } from 'react';
import { Route, HashRouter, Link, Redirect, Switch } from 'react-router-dom';

// Material UI
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';

// Helpers and Constants
import { logout } from '../helpers/auth';
import { firebaseAuth } from '../config/constants';

// Custom Components
import AppDrawer from './AppDrawer';
import Login from './Login';
import Register from './Register';
import Home from './Home';
// import Dashboard from './protected/Dashboard';
import Account from './Account';
import Transactions from './Transactions';
import Gardens from './Gardens';
import Seedlings from './Seedlings';
import Charities from './Charities';

// Test
import Test from './GardenGridV2';
import SingleCharity from './SingleCharity';

function PrivateRoute({ component: Component, authed, user, ...rest}) {
  return ( <Route
{...rest} // these are props passed to Route
    render={props => // "props" are passed to sub-component
      (authed === true ? (
        <Component {...props} user={user}/> // remember to declare what other props you need. i.e "user={user}"
      ) : (
        <Redirect to= { { pathname: "/login", state: { from: props.location } } } />
      ))} />
  );
}

function PublicRoute({ component: Component, authed, ...rest }) {
  return ( <Route {...rest} render={props => (authed === false ? ( <Component {...props} /> ) : ( <Redirect to="/gardens" /> ))} /> );
}

export default class App extends Component {
  state = {
    authed: false,
    loading: true,
    open: false,
    tabIndex: 1,
    user: null,
  };

  handleTabChange = value => { this.setState( { tabIndex: value } ) };
  handleToggle = () => this.setState({ open: !this.state.open });
  handleClose = () => this.setState({ open: false });

  componentDidMount() {
    this.removeListener = firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
          user: user,
        });
      } else {
        this.setState({
          authed: false,
          loading: false,
          user: null,
        });
      }
    });
  }
  componentWillUnmount() {
    this.removeListener();
  }
  render() {
    const authButtons = this.state.authed ? (
      <FlatButton
        label="Logout"
        onClick={() => {
          logout();
        }}
        style={{ color: '#fff' }}
      />
    ) : (
      <span>
        <Link to="/login">
          <FlatButton label="Login" style={{ color: '#fff' }} />
        </Link>
        <Link to="/register">
          <FlatButton label="Register" style={{ color: '#fff' }} />
        </Link>
      </span>
    );


    return this.state.loading === true ? (
      <div
        id="loading-container"
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress size={80} thickness={5} />
      </div>
    ) : (
      <HashRouter>
        <div>
          <AppDrawer
          open={this.state.open}
          handleClose={this.handleClose}
          handleToggle={this.handleToggle}
          />
          <div>
            <AppBar
              title={<img src="/Benevocent_all_grass_bigC.png" style={{height: '30px' }} alt="logo" />}
              onLeftIconButtonTouchTap={this.handleToggle}
              // iconElementRight={topbarButtons}
              iconElementRight={authButtons}
              // children={tabs}
              iconStyleRight={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '0'
              }}
            />

            <div className="container d-flex justify-content-center">
              <div className="row">
                <Switch>
                  <Route path="/" exact component={Home} />
                  <PublicRoute
                    authed={this.state.authed}
                    path="/login"
                    component={Login}
                  />
                  <PublicRoute
                    authed={this.state.authed}
                    path="/register"
                    component={Register}
                  />
                  {
                    // <PrivateRoute
                    //   authed={this.state.authed}
                    //   path="/dashboard"
                    //   component={Dashboard}
                    //   user={this.state.user}
                    // />
                  }
                  <PrivateRoute
                    authed={this.state.authed}
                    path="/account"
                    component={Account}
                    user={this.state.user}
                  />
                  <PrivateRoute
                    authed={this.state.authed}
                    path="/transactions"
                    component={Transactions}
                    user={this.state.user}
                  />
                  <PrivateRoute
                    authed={this.state.authed}
                    path="/gardens"
                    component={Gardens}
                    user={this.state.user}
                  />
                  <PrivateRoute
                    authed={this.state.authed}
                    path="/seedlings"
                    component={Seedlings}
                    user={this.state.user}
                  />
                  <PrivateRoute
                    authed={this.state.authed}
                    exact path="/orgs"
                    component={Charities}
                    user={this.state.user}
                  />
                  <PrivateRoute
                    authed={this.state.authed}
                    exact path="/orgs/:charityName"
                    component={SingleCharity}
                    user={this.state.user}
                  />
                  <PrivateRoute
                    authed={this.state.authed}
                    path="/test"
                    component={Test}
                    user={this.state.user}
                  />
                  <Route render={() => <h3>No Match</h3>} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </HashRouter>
    );
  }
}
