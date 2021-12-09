import React from 'react';
import { Redirect } from 'react-router-dom';
import BaseContainer from '../components/base-container/BaseContainer';
import PageTitle from '../components/page-title/PageTitle';
import { useProject } from '../../hooks';

export default function DashboardPage() {
  const { projectId, projectCategories } = useProject();

  if (projectCategories) {
    return (
      <Redirect to={`/${projectId}/${Object.keys(projectCategories)[0]}`} />
    );
  }

  return (
    <BaseContainer>
      <PageTitle />
      <p>You don&#39;t have any collections yet, let&#39;s create one! Click on &#34;New Collection&#34; on the left.</p>
    </BaseContainer>
  );
}
