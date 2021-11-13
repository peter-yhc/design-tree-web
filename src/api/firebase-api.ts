import { initializeApp } from 'firebase/app';
import {
  getAuth, GoogleAuthProvider, signInWithRedirect, signOut,
  getRedirectResult,
  onAuthStateChanged,
} from 'firebase/auth';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import systemStore, { AuthenticationState } from 'store/system/system-store';

declare let process : {
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

interface GoogleUser {
  uid: string;
  email: string;
  displayName: string;
  metadata: {
    photoUrl: string;
  }
}

function loginWithGoogle() {
  const googleProvider = new GoogleAuthProvider();
  signInWithRedirect(auth, googleProvider);
}

function logout() {
  signOut(auth);
}

function useAuth() {
  const dispatch = useDispatch();
  const [user, setUser] = useState(getAuth().currentUser);

  onAuthStateChanged(auth, (authUser) => {
    dispatch(systemStore.actions.setAuthenticated(AuthenticationState.Working));
    setUser(authUser);
  },
  () => dispatch(systemStore.actions.setAuthenticated(AuthenticationState.Invalid)),
  () => {
    dispatch(systemStore.actions.setAuthenticated(AuthenticationState.Valid));
  });
  return [user];
}

export {
  loginWithGoogle,
  logout,
  useAuth,
  getAuth,
};
