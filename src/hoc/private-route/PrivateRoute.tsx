import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { AuthenticationState, useAuth } from '../../api/firebase-api';
import AppLoader from '../app-loader/AppLoader';

export default function PrivateRoute({ children, ...props }: RouteProps) {
  const [authState] = useAuth();

  if (authState === AuthenticationState.Valid) {
    return (
      <AppLoader>
        <Route {...props}>
          {children}
        </Route>
      </AppLoader>
    );
  }
  if (authState === AuthenticationState.Error) {
    return (<Redirect to="/login" />);
  }
  return (<></>);
}
