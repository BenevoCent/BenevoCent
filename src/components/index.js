import React, { Component } from "react";
import { Route, HashRouter, Link, Redirect, Switch } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Dashboard from "./protected/Dashboard";
import { logout } from "../helpers/auth";
import { firebaseAuth } from "../config/constants";
import AppBar from "material-ui/AppBar";
import FlatButton from "material-ui/FlatButton";

import Drawer from "material-ui/Drawer";
import { List, ListItem } from "material-ui/List";
// import MenuItem from "material-ui/MenuItem";
// import RaisedButton from "material-ui/RaisedButton";
import Divider from "material-ui/Divider";
import { Tabs, Tab } from "material-ui/Tabs";
import SwipeableViews from "react-swipeable-views";

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

function PublicRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authed === false ? (
          <Component {...props} />
        ) : (
          <Redirect to="/dashboard" />
        )
      }
    />
  );
}

export default class App extends Component {
  state = {
    authed: false,
    loading: true,
    open: false,
    tabIndex: 1
  };

  handleTabChange = value => {
    this.setState({
      tabIndex: value
    });
  };

  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });

  componentDidMount() {
    this.removeListener = firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authed: true,
          loading: false
        });
      } else {
        this.setState({
          authed: false,
          loading: false
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
        style={{ color: "#fff" }}
      />
    ) : (
      <span>
        <Link to="/login">
          <FlatButton label="Login" style={{ color: "#fff" }} />
        </Link>
        <Link to="/register">
          <FlatButton label="Register" style={{ color: "#fff" }} />
        </Link>
      </span>
    );

    // const tabs = (
    //   <div>
    //     <Tabs onChange={this.handleTabChange} value={this.state.tabIndex}>
    //       <Tab label="Transactions" value={0} />
    //       <Tab label="Present" value={1} />
    //       <Tab label="Discover" value={2} />
    //     </Tabs>
    //       <SwipeableViews
    //         index={this.state.tabIndex}
    //         onChangeIndex={this.handleChange}
    //       >
    //       <div>
    //         <h2 style={{ fontSize: 24, paddingTop: 16, marginBottom: 12, fontWeight: 400 }}>Transactions</h2>
    //         Swipe to see the next slide.<br />
    //       </div>
    //       <div style={{padding: 10}}>
    //         Present
    //         <Home/>
    //       </div>
    //       <div style={{padding: 10}}>Discover</div>
    //     </SwipeableViews>
    //   </div>
    // )

    // const topbarButtons = (
    //   <div>
    //     <Link to="/">
    //       <FlatButton label="Home" style={{ color: "#fff" }} />
    //     </Link>
    //     <Link to="/dashboard">
    //       <FlatButton label="dashboard" style={{ color: "#fff" }} />
    //     </Link>
    //     {authButtons}
    //   </div>
    // );
    return this.state.loading === true ? (
      <h1>Loading</h1>
    ) : (
      <HashRouter>
        <div>
          <Drawer
            docked={false}
            width={275}
            open={this.state.open}
            onRequestChange={open => this.setState({ open })}
          >
            <List>
              <Link to="/">
                <ListItem primaryText="Home" onClick={this.handleClose} />
              </Link>
              <Link to="/account">
                <ListItem primaryText="Account" onClick={this.handleClose} />
              </Link>
              <Link to="/transactions">
                <ListItem
                  primaryText="Transactions"
                  onClick={this.handleClose}
                />
              </Link>
              <Link to="/gardens">
                <ListItem primaryText="Gardens" onClick={this.handleClose} />
              </Link>
              <Link to="/seedlings">
                <ListItem primaryText="Seedlings" onClick={this.handleClose} />
              </Link>

              <ListItem
                primaryText="Discover"
                initiallyOpen={true}
                primaryTogglesNestedList={true}
                nestedItems={[
                  <Link key={"orgs"} to="/discover/orgs">
                    <ListItem
                      primaryText="Organizations / Non-Profits"
                      onClick={this.handleClose}
                      style={{ marginLeft: "18px" }}
                    />
                  </Link>,
                  <Link key={"causes"} to="/discover/causes">
                    <ListItem
                      primaryText="Causes"
                      onClick={this.handleClose}
                      style={{ marginLeft: "18px" }}
                    />
                  </Link>
                ]}
              />
              <Divider />

              <Link to="/logout">
                <ListItem primaryText="Logout" onClick={this.handleClose} />
              </Link>

              <Divider />

              <Link to="/about">
                <ListItem
                  primaryText="About / Credits"
                  onClick={this.handleClose}
                />
              </Link>
            </List>
          </Drawer>
          <div>
            <AppBar
              title="BenevoCent"
              onLeftIconButtonTouchTap={this.handleToggle}
              // iconElementRight={topbarButtons}
              iconElementRight={authButtons}
              // children={tabs}
              iconStyleRight={{
                display: "flex",
                alignItems: "center",
                marginTop: "0"
              }}
            />
            <Tabs onChange={this.handleTabChange} value={this.state.tabIndex}>
              <Tab label="Transactions" value={0} />
              <Tab label="Present" value={1} />
              <Tab label="Discover" value={2} />
            </Tabs>
            <SwipeableViews
              index={this.state.tabIndex}
              onChangeIndex={this.handleChange}
            >
              <div>
                <h2
                  style={{
                    fontSize: 24,
                    paddingTop: 16,
                    marginBottom: 12,
                    fontWeight: 400
                  }}
                >
                  Transactions
                </h2>
                Swipe to see the next slide.<br />
              </div>
              <div style={{ padding: 10 }}>
                Present
                <Home />
              </div>
              <div style={{ padding: 10 }}>Discover</div>
            </SwipeableViews>

            <div className="container d-flex justify-content-center mt-3">
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
                  <PrivateRoute
                    authed={this.state.authed}
                    path="/dashboard"
                    component={Dashboard}
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
