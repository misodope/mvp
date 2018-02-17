import * as React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.login = this.login.bind(this);
  }

  login() {
    axios.post('/login', {
      username: this.state.username,
      password: this.state.password
    })
    .then(() => {
      console.log("You're logged in!")
    })
    .catch((error) => {
      console.log("Failed to login", error)
    })
  }

  render() {
    return (<ReactBootstrap.Form>

      <ReactBootstrap.FormGroup controlId="loginUsername">
        <ReactBootstrap.Col componentClass={ReactBootstrap.ControlLabel} smOffset={2} sm={2}>
          Username
        </ReactBootstrap.Col>
        <ReactBootstrap.Col sm={5}>
          <ReactBootstrap.FormControl input={this.state.username} onChange={(e) => {this.setState({username: e.target.value})}} type="text" placeholder="Username"/>
        </ReactBootstrap.Col>
      </ReactBootstrap.FormGroup>

      <ReactBootstrap.FormGroup controlId="loginPassword">
        <ReactBootstrap.Col componentClass={ReactBootstrap.ControlLabel} smOffset={2} sm={2}>
          Password
        </ReactBootstrap.Col>
        <ReactBootstrap.Col sm={5}>
          <ReactBootstrap.FormControl input={this.state.password} onChange={(e) => {this.setState({password: e.target.value})}} type="password" placeholder="Password"/>
        </ReactBootstrap.Col>
      </ReactBootstrap.FormGroup>

      <ReactBootstrap.FormGroup>
        <ReactBootstrap.Col smOffset={2} sm={5}>
          <ReactBootstrap.Button type="submit" bsStyle="info" onClick={this.login}>Login!</ReactBootstrap.Button>
        </ReactBootstrap.Col>
      </ReactBootstrap.FormGroup>

    </ReactBootstrap.Form>)
  }
}

export default Login
