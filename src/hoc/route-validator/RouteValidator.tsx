import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useRouteMatch } from 'react-router-dom';
import { RootState } from 'store';

interface RouteValidatorProps{
    children: React.ReactNode
}

interface MatchProps {
  project: string;
  collection: string;
  subcollection: string;
}

export default function RouteValidator({ children }: RouteValidatorProps) {
  const { project, collection, subcollection } = useRouteMatch<MatchProps>().params;
  const projects = useSelector((state: RootState) => state.profile.projects);

  if (!Object.keys(projects).includes(project)) {
    return <Redirect to="/404" />;
  }

  if (collection && !Object.keys(projects[project].collections).includes(collection)) {
    return <Redirect to="/404" />;
  }

  if (subcollection && !Object.keys(projects[project].collections[collection].subCategories).includes(subcollection)) {
    return <Redirect to="/404" />;
  }

  return (
    <>{children}</>
  );
}
