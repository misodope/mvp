import * as React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

var logoutStyle = {
  position: 'absolute',
  right: '0'
}

const popoverLogout = (
<ReactBootstrap.Popover id="popover-trigger-focus" title="Logout">
  <strong>You have logged out!</strong>
</ReactBootstrap.Popover>
);

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.alertOptions = {
      offset: 14,
      position: 'bottom left',
      theme: 'dark',
      time: 5000,
      transition: 'scale'
    };
  }


  render() {
    return (
      <ReactBootstrap.Nav bsStyle="tabs">

        <ReactBootstrap.NavItem eventKey="1" onClick={this.props.login}>
          Login
        </ReactBootstrap.NavItem>

        <ReactBootstrap.NavItem eventKey="2" onClick={this.props.signup}>
          Signup
        </ReactBootstrap.NavItem>

        <ReactBootstrap.OverlayTrigger trigger="click" placement="bottom" overlay={popoverLogout}>
        <ReactBootstrap.NavItem eventKey="3" onClick={this.props.logout} style={logoutStyle}>
          Logout
        </ReactBootstrap.NavItem>
        </ReactBootstrap.OverlayTrigger>

      </ReactBootstrap.Nav>
    )
  }
}

export default Navigation;
