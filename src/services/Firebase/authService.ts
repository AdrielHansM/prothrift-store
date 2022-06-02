import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, User, signOut, updateProfile } from "firebase/auth";
import { app } from "./firebaseApp";
import { createUser, getUser } from "./firestoreService";

//Authentication
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('user');
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
  .then((userCredential) =>  {

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

