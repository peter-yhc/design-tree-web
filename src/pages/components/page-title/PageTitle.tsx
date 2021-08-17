import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useProject } from 'hooks';

interface MatchProps {
  category: string;
  subcategory: string;
}

export default function PageTitle() {
  const { projectName, projectCategories } = useProject();
  const match = useRouteMatch<MatchProps>();
  const [category, subcategory] = [match.params.category, match.params.subcategory];

  const render = () => {
    if (!category && !subcategory) {
      return (<h1>{projectName}</h1>);
    }
    if (subcategory) {
      return (<h1>{projectCategories[category].subCategories[subcategory].name}</h1>);
    }
    return (<h1>{projectCategories[category].name}</h1>);
  };

  return (
    <>
      {render()}
    </>
  );
}
