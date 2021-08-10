import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Dashboard } from './pages';

export default function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <span>Landing page</span>
      </Route>
      <Route path="/dashboard" exact component={Dashboard} />
    </Switch>
  );
}
