import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { CategoryPage, Dashboard, PageNotFound } from './pages';
import RouteValidator from './hoc/RouteValidator';

export default function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <span>Landing page</span>
      </Route>
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/:project/:category/:subcategory" exact>
        <RouteValidator>
          <CategoryPage />
        </RouteValidator>
      </Route>
      <Route path="/:project/:category" exact>
        <RouteValidator>
          <CategoryPage />
        </RouteValidator>
      </Route>
      <Route path="/" component={PageNotFound} />
    </Switch>
  );
}
