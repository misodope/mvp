import * as React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Navigation from './Navigation.jsx'
import Upload from './Upload.jsx'
import Signup from './Signup.jsx'
import Login from './Login.jsx'
import Yelp from './Yelp.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signupClicked: false,
      loginClicked: false,
      foods: [],
      path: ''
    }
    this.navSignup = this.navSignup.bind(this);
    this.navLogin = this.navLogin.bind(this);
    this.getFood = this.getFood.bind(this);
    this.randomFood = this.randomFood.bind(this);
    this.stopFood = this.stopFood.bind(this);
    this.navLogout = this.navLogout.bind(this);
    this.run = true;
  }

  navSignup() {
    this.setState({
      signupClicked: !this.state.signupClicked
    })
    ReactDOM.render(<Signup />, document.getElementById('app'));
  }

  navLogin() {
    this.setState({
      loginClicked: !this.state.loginClicked
    })
    ReactDOM.render(<Login />, document.getElementById('app'));
  }

  navLogout() {
    console.log('logout function called');
    axios.post('/logout')
    .then(() => {
      console.log("Worked!");
      this.setState({
        logoutClicked: !this.state.logoutClicked
      })
    })
    .catch(() => {
      console.log('Logout failed');
    })

  }

  getFood() {
    axios.get('/food')
    .then((foods) => {
      this.setState({
        foods: foods.data
      })
    })
    .then(() => {
      this.randomFood();
    })
    .catch((error) => {
      console.log("Couldn't get any food!", error);
    })
  }

  randomFood() {
    this.run = true;
    if (this.state.foods.length > 0 && this.run === true) {
      let random = setInterval(() => {
        let i = Math.floor((Math.random() * this.state.foods.length) + 0);
        this.setState({
          path: this.state.foods[i].path
        })
        if (this.run === false) {
          clearInterval(random);
        }
      }, 100);
    }
  }

  stopFood() {
    this.run = false;
  }

  render() {
    return (
      <div>
        <Navigation signup={this.navSignup} login={this.navLogin} logout={this.navLogout}/>
        <ReactBootstrap.Grid>
          <ReactBootstrap.Row className="show-grid">
            <ReactBootstrap.Col md={6}>
              <h1>Don't know what to eat?</h1>
              <ReactBootstrap.ButtonToolbar>
                <ReactBootstrap.Button bsStyle="info" bsSize="small" onClick={this.getFood}>Start To Randomize</ReactBootstrap.Button>
              </ReactBootstrap.ButtonToolbar>
              <br/>
              <ReactBootstrap.Image src={this.state.path} onClick={this.stopFood} responsive rounded/>
            </ReactBootstrap.Col>
            <ReactBootstrap.Col md={6}>
              <h1>Upload Food!</h1>
              <Upload />
              <Yelp />
            </ReactBootstrap.Col>
            </ReactBootstrap.Row>
        </ReactBootstrap.Grid>
      </div>
    )
  }
}



ReactDOM.render(<App />, document.getElementById('app'));
