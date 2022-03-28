import React from 'react';
import styled from 'styled-components';
import BaseContainer from '../components/base-container/BaseContainer';
import { useAppSelector } from '../../store';
import ProjectSettingTable from './components/ProjectSettingTable';
import NewCollectionAction from './components/NewCollectionAction';
import NewFocusAction from './components/NewFocusAction';

const Container = styled.article`
  display: flex;
  flex-direction: column;
`;

const Card = styled.section`
  margin: ${(props) => props.theme.outerSpacing.large} 0;
  width: 100%;
`;

export default function ProjectSettingsPage() {
  const projects = useAppSelector((state) => state.profile.projects);

  return (
    <BaseContainer>
      <h1>Your Projects</h1>
      <Container>
        {
          Object.keys(projects).map((key) => (
            <Card key={key}>
              <h2>{projects[key].name}</h2>
              <ProjectSettingTable project={{ uid: key, ...projects[key] }} />
              <NewCollectionAction />
              <NewFocusAction />
            </Card>
          ))
        }
      </Container>
    </BaseContainer>
  );
}
