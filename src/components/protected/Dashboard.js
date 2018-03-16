import React, { Component } from 'react';
import { saveUser } from '../../helpers/auth';
import { db, firebaseAuth } from '../../config/constants';

function onGoogleLoginReload() {
  // Result from Redirect auth flow.
  return firebaseAuth().getRedirectResult()
    .then(result => {
      const user = result.user;
      db.collection('users')
      .where('email', '==', user.email)
      .get()
      .then(snapshot => {
        if (snapshot.docs.length === 0) {
          saveUser(user);
        }
      })
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      if (errorCode === 'auth/account-exists-with-different-credential') {
        alert('You have already signed up with a different auth provider for that email.');
        // If you are using multiple auth providers on your app you should handle linking
        // the user's accounts here.
      } else {
        console.error(error);
      }
    });
}

export default class Dashboard extends Component {

  componentDidMount() {
    onGoogleLoginReload();
  }

  render() {
    return (
      <div>
        Dashboard. This is a protected route. You can only see this if you're
        authed.
      </div>
    );
  }
}
