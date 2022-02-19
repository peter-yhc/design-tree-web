import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { RouteValidator } from 'hoc';
import {
  CollectionViewPage, DashboardPage, PageNotFound, ProjectSettingsPage,
} from './pages';
import LoginPage from './pages/login/LoginPage';
import PrivateRoute from './hoc/private-route/PrivateRoute';
import { useRegisterGlobalScrollHook, useRegisterResponsiveListener } from './hooks';

export default function App() {
  useRegisterGlobalScrollHook();
  useRegisterResponsiveListener();

  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/dashboard" />
      </Route>
      <Route path="/login" exact component={LoginPage} />
      <PrivateRoute path="/project/settings" exact component={ProjectSettingsPage} />
      <PrivateRoute path="/dashboard" exact component={DashboardPage} />
      <PrivateRoute path="/:project/:collection/:focus" exact>
        <RouteValidator>
          <CollectionViewPage />
        </RouteValidator>
      </PrivateRoute>
      <PrivateRoute path="/:project/:collection" exact>
        <RouteValidator>
          <CollectionViewPage />
        </RouteValidator>
      </PrivateRoute>
      <Route path="/" component={PageNotFound} />
    </Switch>
  );
}
