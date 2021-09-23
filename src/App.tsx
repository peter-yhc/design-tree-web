import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { RouteValidator } from 'hoc';
import { CategoryViewPage, Dashboard, PageNotFound } from './pages';
import AppLoader from './hoc/app-loader/AppLoader';

export default function App() {
  return (
    <AppLoader>
      <Switch>
        <Route path="/" exact>
          <span>Landing page</span>
        </Route>
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/:project/:category/:subcategory" exact>
          <RouteValidator>
            <CategoryViewPage />
          </RouteValidator>
        </Route>
        <Route path="/:project/:category" exact>
          <RouteValidator>
            <CategoryViewPage />
          </RouteValidator>
        </Route>
        <Route path="/" component={PageNotFound} />
      </Switch>
    </AppLoader>
  );
}
