import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useRouteMatch } from 'react-router-dom';
import { RootState } from 'store';

interface RouteValidatorProps{
    children: React.ReactNode
}

interface MatchProps {
  project: string;
  category: string;
  subcategory: string;
}

export default function RouteValidator({ children }: RouteValidatorProps) {
  const { project, category, subcategory } = useRouteMatch<MatchProps>().params;
  const projects = useSelector((state: RootState) => state.profile.projects);

  if (!Object.keys(projects).includes(project)) {
    return <Redirect to="/404" />;
  }

  if (category && !Object.keys(projects[project].categories).includes(category)) {
    return <Redirect to="/404" />;
  }

  if (subcategory && !Object.keys(projects[project].categories[category].subCategories).includes(subcategory)) {
    return <Redirect to="/404" />;
  }

  return (
    <>{children}</>
  );
}
