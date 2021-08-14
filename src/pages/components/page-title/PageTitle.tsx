import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

interface MatchProps {
    category: string;
    subcategory: string;
}

export default function PageTitle() {
  const match = useRouteMatch<MatchProps>();
  const activeProjectId = 'taylor-home';
  const categories = useSelector((state: RootState) => state.profile.projects[activeProjectId].categories);
  const [category, subcategory] = [match.params.category, match.params.subcategory];

  return (
    <h1>
      {
        subcategory
          ? categories[category].subCategories[subcategory].name
          : categories[category].name
      }
    </h1>
  );
}
