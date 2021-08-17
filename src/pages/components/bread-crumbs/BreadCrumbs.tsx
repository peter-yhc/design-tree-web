import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { useProject } from 'hooks';

interface MatchProps {
    category: string;
    subcategory: string;
}

const BreadCrumbLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export default function BreadCrumbs() {
  const match = useRouteMatch<MatchProps>();
  const { projectId, projectName, projectCategories } = useProject();
  const [category, subcategory] = [match.params.category, match.params.subcategory];

  return (
    <h5>
      <BreadCrumbLink to="/dashboard">{projectName}</BreadCrumbLink>
      {' > '}
      <BreadCrumbLink to={`/${projectId}/${category}`}>{projectCategories[category].name}</BreadCrumbLink>
      {subcategory && ' > '}
      {subcategory && <BreadCrumbLink to={`/${projectId}/${category}/${subcategory}`}>{projectCategories[category].subCategories[subcategory].name}</BreadCrumbLink>}
    </h5>
  );
}
