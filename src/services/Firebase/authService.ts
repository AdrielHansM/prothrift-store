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
        contact
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
  //window.location.replace('/');
}

// UTILS to get current user data:
export const isUserSignedIn = async () => {
  return await !!auth.currentUser;
}

// TODO use a valid assets URL for the placeholder
export const getProfilePicUrl = () => {
  return auth.currentUser?.photoURL || '/images/profile_placeholder.png';
}

export const getUserName = (): string | null => {
  return auth.currentUser?.displayName || "";
}

export const getLoggedUser = async () => {
  return await auth.currentUser;
}