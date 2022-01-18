import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useProject } from 'hooks';
import styled from 'styled-components';

interface MatchProps {
  collection: string;
  focus: string;
}

const H1 = styled.h1`
  margin: 0;
`;

export default function PageTitle() {
  const { projectName, projectCategories } = useProject();
  const match = useRouteMatch<MatchProps>();
  const [collection, focus] = [match.params.collection, match.params.focus];

  const render = () => {
    if (!collection && !focus) {
      return (<H1>{projectName}</H1>);
    }
    if (focus) {
      return (<H1>{projectCategories[collection].focuses[focus].name}</H1>);
    }
    return (<H1>{projectCategories[collection].name}</H1>);
  };

  return (
    <>
      {render()}
    </>
  );
}
