import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { RouteValidator } from 'hoc';
import { CollectionViewPage, DashboardPage, PageNotFound } from './pages';
import LoginPage from './pages/login/LoginPage';
import PrivateRoute from './hoc/private-route/PrivateRoute';

export default function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <span>Landing page</span>
      </Route>
      <Route path="/login" exact component={LoginPage} />
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
