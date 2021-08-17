import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { CategoryPage, Dashboard } from './pages';

export default function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <span>Landing page</span>
      </Route>
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/:project/:category/:subcategory" exact component={CategoryPage} />
      <Route path="/:project/:category" exact component={CategoryPage} />
    </Switch>
  );
}
