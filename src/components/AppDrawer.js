import Drawer from "material-ui/Drawer";
import { List, ListItem } from "material-ui/List";
import Divider from "material-ui/Divider";
import { Link } from "react-router-dom";

import React, { Component } from "react";

export default class AppDrawer extends Component {
  render() {
    return (
      <div>
        <Drawer
          docked={false}
          width={275}
          open={this.props.open}
          onRequestChange={this.props.handleClose}
        >
          <List>
            <Link to="/">
              <ListItem primaryText="Home" onClick={this.props.handleClose} />
            </Link>
            <Link to="/account">
              <ListItem
                primaryText="Account"
                onClick={this.props.handleClose}
              />
            </Link>
            <Link to="/transactions">
              <ListItem
                primaryText="Transactions"
                onClick={this.props.handleClose}
              />
            </Link>
            <Link to="/gardens">
              <ListItem
                primaryText="Gardens"
                onClick={this.props.handleClose}
              />
            </Link>
            <Link to="/seedlings">
              <ListItem
                primaryText="Seedlings"
                onClick={this.props.handleClose}
              />
            </Link>

            <ListItem
              primaryText="Discover"
              initiallyOpen={true}
              primaryTogglesNestedList={true}
              nestedItems={[
                <Link key={"orgs"} to="/discover/orgs">
                  <ListItem
                    primaryText="Organizations / Non-Profits"
                    onClick={this.props.handleClose}
                    style={{ marginLeft: "18px" }}
                  />
                </Link>,
                <Link key={"causes"} to="/discover/causes">
                  <ListItem
                    primaryText="Causes"
                    onClick={this.props.handleClose}
                    style={{ marginLeft: "18px" }}
                  />
                </Link>
              ]}
            />
            <Divider />

            <Link to="/logout">
              <ListItem primaryText="Logout" onClick={this.props.handleClose} />
            </Link>

            <Divider />

            <Link to="/about">
              <ListItem
                primaryText="About / Credits"
                onClick={this.props.handleClose}
              />
            </Link>
          </List>
        </Drawer>
      </div>
    );
  }
}
