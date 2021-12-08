import { initializeApp } from 'firebase/app';
import {
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithRedirect,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from 'firebase/auth';
import { useState } from 'react';

declare let process: {
  env: {
    firebaseConfig: any;
  }
};

const app = initializeApp({
  apiKey: process.env.firebaseConfig.FIREBASE_API_KEY,
  authDomain: process.env.firebaseConfig.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.firebaseConfig.FIREBASE_PROJECT_ID,
  storageBucket: process.env.firebaseConfig.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.firebaseConfig.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.firebaseConfig.FIREBASE_APP_ID,
});
const auth = getAuth(app);

// eslint-disable-next-line no-shadow
export enum AuthenticationState {
  // eslint-disable-next-line no-unused-vars
  Uninitialised, Error, Valid
}

async function loginWithEmailPassword({ email, password }: { email: string, password: string }): Promise<UserCredential> {
  await setPersistence(auth, browserLocalPersistence);
  return signInWithEmailAndPassword(auth, email, password);
}

function loginWithGoogle() {
  const googleProvider = new GoogleAuthProvider();
  setPersistence(auth, browserLocalPersistence).then(() => {
    signInWithRedirect(auth, googleProvider);
  });
}

async function logout() {
  await signOut(auth);
}

function useAuth() {
  const [authState, setAuthState] = useState(AuthenticationState.Uninitialised);

  onAuthStateChanged(auth, (authUser) => {
    if (authUser) {
      setAuthState(AuthenticationState.Valid);
    } else {
      setAuthState(AuthenticationState.Error);
    }
  });
  return [authState];
}

export {
  loginWithGoogle,
  loginWithEmailPassword,
  logout,
  useAuth,
  getAuth,
};
