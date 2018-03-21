import React, { Component } from 'react';
import { db, firebaseAuth } from '../../config/constants';

function onGoogleLoginReload() {
  // Result from Redirect auth flow.
  return firebaseAuth().getRedirectResult()
    .then(result => {
      const user = result.user;
      const userRef = db.collection('users').doc(user.uid);

      return db.runTransaction(async txn => {
        const userData = await txn.get(userRef);
        if (!userData.exists)
        return txn.set(userRef, {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid
        });
      });
    })
    .catch(error => {
      const errorCode = error.code;
 
      if (errorCode === 'auth/account-exists-with-different-credential') {
        alert('You have already signed up with a different auth provider for that email.');
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
