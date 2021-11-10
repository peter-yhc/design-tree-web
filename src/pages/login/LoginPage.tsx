/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { getRedirectResult, User } from 'firebase/auth';
import { getAuth, loginWithGoogle, logout } from '../../api/firebase-api';

export default function LoginPage() {
  // const db = getFirestore(app);
  const [user, setUser] = useState<User | null>(null);
  const [isWorking, setIsWorking] = useState(true);

  getRedirectResult(getAuth())
    .then(
      (result) => {
        setUser(result?.user || null);
        setIsWorking(false);
      },
      () => setIsWorking(false),
    );

  if (isWorking) {
    return (<span>Working on it...</span>);
  }
  if (user) {
    return (<Redirect to="/dashboard" />);
  }
  return (
    <main>
      <button onClick={loginWithGoogle} type="button">
        Login with Google
      </button>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </main>
  );
}
