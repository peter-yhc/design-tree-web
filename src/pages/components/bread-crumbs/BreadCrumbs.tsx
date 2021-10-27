import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { useProject } from 'hooks';

interface MatchProps {
    collection: string;
    subcollection: string;
}

const BreadCrumbLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export default function BreadCrumbs() {
  const match = useRouteMatch<MatchProps>();
  const { projectId, projectName, projectCategories } = useProject();
  const [collection, subcollection] = [match.params.collection, match.params.subcollection];

  return (
    <h5>
      <BreadCrumbLink to="/dashboard">{projectName}</BreadCrumbLink>
      {' > '}
      <BreadCrumbLink to={`/${projectId}/${collection}`}>{projectCategories[collection].name}</BreadCrumbLink>
      {subcollection && ' > '}
      {subcollection && <BreadCrumbLink to={`/${projectId}/${collection}/${subcollection}`}>{projectCategories[collection].subCategories[subcollection].name}</BreadCrumbLink>}
    </h5>
  );
}
