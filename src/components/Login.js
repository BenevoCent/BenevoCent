import React, { Component } from 'react';
import { login, resetPassword, googleLogin, saveUser } from '../helpers/auth';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { firebaseAuth } from '../config/constants';

function setErrorMsg(error) {
  return {
    loginMessage: error
  };
}

function onGoogleLoginReload() {
  // Result from Redirect auth flow.
  firebaseAuth().getRedirectResult()
  .then(result => {
    // if (result.credential) {
    //   // This gives you a Google Access Token. You can use it to access the Google API.
    //   const token = result.credential.accessToken;
    //   document.getElementById('quickstart-oauthtoken').textContent = token;
    // } else {
    //   document.getElementById('quickstart-oauthtoken').textContent = 'null';
    // }
    // The signed-in user info.
    const user = result.user;
    saveUser(user);
  })
  .catch(error => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    console.log('email: ', email);
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    console.log('credential: ', credential);
    console.log(`${errorCode}: ${errorMessage}`);
    if (errorCode === 'auth/account-exists-with-different-credential') {
      alert('You have already signed up with a different auth provider for that email.');
      // If you are using multiple auth providers on your app you should handle linking
      // the user's accounts here.
    } else {
      console.error(error);
    }
  });
}


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loginMessage: null
    };
  }

  componentDidMount() {
    console.log('hit');
    onGoogleLoginReload();
  }

  handleSubmit = e => {
    e.preventDefault();
    login(this.state.email, this.state.password).catch(error => {
      this.setState(setErrorMsg('Invalid username/password.'));
    });
  };
  resetPassword = () => {
    resetPassword(this.state.email)
      .then(() =>
        this.setState(
          setErrorMsg(`Password reset email sent to ${this.state.email}.`)
        )
      )
      .catch(error => this.setState(setErrorMsg(`Email address not found.`)));
  };
  render() {
    return (
      <div>
        <form
          style={style.container}
          onSubmit={event => this.handleSubmit(event)}
        >
          <h3>Login</h3>
          <TextField
            hintText="Enter your Email"
            floatingLabelText="Email"
            onChange={(event, newValue) => this.setState({ email: newValue })}
          />
          <br />
          <TextField
            type="password"
            hintText="Enter your Password"
            floatingLabelText="Password"
            onChange={(event, newValue) => this.setState({ password: newValue })}
          />
          <br />
          {this.state.loginMessage && (
            <div className="alert alert-danger" role="alert">
              <span
                className="glyphicon glyphicon-exclamation-sign"
                aria-hidden="true"
              />
              <span className="sr-only">Error:</span>
              &nbsp;{this.state.loginMessage}{' '}
              <a href="#" onClick={this.resetPassword} className="alert-link">
                Forgot Password?
              </a>
            </div>
          )}
          <RaisedButton
            label="Login"
            primary={true}
            style={style.raisedBtn}
            type="submit"
          />
        </form>
        <div>
          <h5>OR</h5>
        </div>
        <div>
          <p>
            <button type="button" onClick={googleLogin}>Login with Google</button>
          </p>
        </div>
      </div>
    );
  }
}

const raisedBtn = {
  margin: 15
};

const container = {
  textAlign: 'center'
};

const style = {
  raisedBtn,
  container
};
