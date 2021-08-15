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
  const activeProjectId = useSelector((state: RootState) => state.system.activeProjectId) as string;
  const { projectName, categories } = useSelector((state: RootState) => ({
    projectName: state.profile.projects[activeProjectId].name,
    categories: state.profile.projects[activeProjectId].categories,
  }));
  const [category, subcategory] = [match.params.category, match.params.subcategory];

  const render = () => {
    if (!category && !subcategory) {
      return (<h1>{projectName}</h1>);
    }
    if (subcategory) {
      return (<h1>{categories[category].subCategories[subcategory].name}</h1>);
    }
    return (<h1>{categories[category].name}</h1>);
  };

  return (
    <>
      { render() }
    </>
  );
}
