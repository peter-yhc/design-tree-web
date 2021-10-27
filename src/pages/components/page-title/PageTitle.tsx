import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useProject } from 'hooks';

interface MatchProps {
  collection: string;
  subcollection: string;
}

export default function PageTitle() {
  const { projectName, projectCategories } = useProject();
  const match = useRouteMatch<MatchProps>();
  const [collection, subcollection] = [match.params.collection, match.params.subcollection];

  const render = () => {
    if (!collection && !subcollection) {
      return (<h1>{projectName}</h1>);
    }
    if (subcollection) {
      return (<h1>{projectCategories[collection].subCategories[subcollection].name}</h1>);
    }
    return (<h1>{projectCategories[collection].name}</h1>);
  };

  return (
    <>
      {render()}
    </>
  );
}
