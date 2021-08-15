import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../../../store';

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
  const activeProjectId = useSelector((state: RootState) => state.system.activeProjectId) as string;
  const categories = useSelector((state: RootState) => state.profile.projects[activeProjectId].categories);
  const [category, subcategory] = [match.params.category, match.params.subcategory];

  return (
    <h5>
      Taylor Home
      {' > '}
      <BreadCrumbLink to={`/${category}`}>{categories[category].name}</BreadCrumbLink>
      {subcategory && ' > '}
      {subcategory && <BreadCrumbLink to={`/${category}/${subcategory}`}>{categories[category].subCategories[subcategory].name}</BreadCrumbLink>}
    </h5>
  );
}
