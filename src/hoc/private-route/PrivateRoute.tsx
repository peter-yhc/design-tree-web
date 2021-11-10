import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from '../../api/firebase-api';

export default function PrivateRoute({ children, ...props }: RouteProps) {
  const [currentUser] = useAuth();

  return (
    <>
      {currentUser
        ? (
          <Route {...props}>
            {children}
          </Route>
        )
        : <Redirect to="/login" />}
    </>
  );
}
