import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from '../../api/firebase-api';
import AppLoader from '../app-loader/AppLoader';

export default function PrivateRoute({ children, ...props }: RouteProps) {
  const [currentUser] = useAuth();

  return (
    <>
      {currentUser
        ? (
          <AppLoader>
            <Route {...props}>
              {children}
            </Route>
          </AppLoader>
        )
        : <Redirect to="/login" />}
    </>
  );
}
