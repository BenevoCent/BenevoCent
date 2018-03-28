import { db, firebaseAuth } from '../config/constants';

export function auth(email, pw) {
  return firebaseAuth()
    .createUserWithEmailAndPassword(email, pw)
    .then(saveUser);
}

export function logout() {
  return firebaseAuth().signOut();
}

export function login(email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw);
}

export function googleLogin() {
  const provider = new firebaseAuth.GoogleAuthProvider();
  return firebaseAuth().signInWithRedirect(provider);
}

export function resetPassword(email) {
  return firebaseAuth().sendPasswordResetEmail(email);
}

export function saveUser(user) {
  return db
    .collection(`users`)
    .doc(user.uid)
    .set({
      displayName: user.displayName,
      email: user.email,
      uid: user.uid
    })
    .then(docRef => docRef)
    .catch(function(error) {
      console.error('Error adding document: ', error);
    });
}
