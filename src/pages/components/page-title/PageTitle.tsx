import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useProject } from 'hooks';

interface MatchProps {
  collection: string;
  focus: string;
}

export default function PageTitle() {
  const { projectName, projectCategories } = useProject();
  const match = useRouteMatch<MatchProps>();
  const [collection, focus] = [match.params.collection, match.params.focus];

  const render = () => {
    if (!collection && !focus) {
      return (<h1>{projectName}</h1>);
    }
    if (focus) {
      return (<h1>{projectCategories[collection].focuses[focus].name}</h1>);
    }
    return (<h1>{projectCategories[collection].name}</h1>);
  };

  return (
    <>
      {render()}
    </>
  );
}
