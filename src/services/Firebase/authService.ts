import { auth } from "./firebaseApp";
import { createUser} from "./firestoreService";
import UserData from "../../models/User";



auth.onAuthStateChanged((user) => {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('user');
  }
});

export const signUp = async (firstName: string, lastName: string, email: string, contact : number, password: string) => await auth.createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user?.uid, firstName, lastName, email, contact)
    if (user?.uid) {
      createUser(
        user.uid,
        firstName,
        lastName,
        email,
        contact,
        new Date()
      )
    }
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // TODO generate an alert service for displaying error messages
    alert(errorCode + " " + errorMessage)
  });

export const signIn = async (email: string, password: string) => auth.signInWithEmailAndPassword(email, password)
  .then((userCredential) =>  {

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + " " + errorMessage)
    return Promise.reject(errorCode)
  });

export const signOutUser = async () => {
  await auth.signOut();
  window.location.replace('/');
}

