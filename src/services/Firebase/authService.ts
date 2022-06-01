import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, User, signOut, updateProfile } from "firebase/auth";
import firebaseApp from "./firebaseApp";
import { createUser, getUser } from "./firestoreService";
const auth = getAuth(firebaseApp);

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    // TODO review if all this information is needed
    localStorage.setItem('u', JSON.stringify(user));
    // ...
  } else {
    // User is signed out
    localStorage.removeItem('u');
    // ...
  }
});

export const signUp = async (firstName: string, lastName: string, email: string, contact : number, password: string) => createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    createUser(
      userCredential.user.uid,
      firstName,
      lastName,
      email,
      contact
    )
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // TODO generate an alert service for displaying error messages
    alert(errorCode + " " + errorMessage)
  });

export const signIn = async (email: string, password: string) => signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = getUser(userCredential.user.uid);
    localStorage.setItem('user', JSON.stringify(user))
  })
  
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + " " + errorMessage)
    return Promise.reject(errorCode)
  });

export const signOutUser = async () => {
  await signOut(auth);
  window.location.replace('/');
}

export const updateUser = async (updatedUser: User) => {
  auth.currentUser &&
    updateProfile(auth.currentUser, { displayName: updatedUser.displayName, photoURL: updatedUser.photoURL })
      .then(() => { auth.currentUser?.getIdToken(true) })
      .catch(error => console.error("update error", error.message))
}

// UTILS to get current user data:
export const isUserSignedIn = () => {
  return !!auth.currentUser;
}

// TODO use a valid assets URL for the placeholder
export const getProfilePicUrl = () => {
  return auth.currentUser?.photoURL || '/images/profile_placeholder.png';
}

export const getUserName = (): string | null => {
  return auth.currentUser?.displayName || "";
}

export const getLoggedUser = (): User | null => {
  return auth.currentUser;
}

