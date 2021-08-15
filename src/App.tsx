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
      <Route path="/:category/:subcategory" exact component={CategoryPage} />
      <Route path="/:category" exact component={CategoryPage} />
    </Switch>
  );
}
