import React from 'react';
import styled from 'styled-components';
import BaseContainer from '../components/base-container/BaseContainer';
import { useAppSelector } from '../../store';
import ProjectSettingTable from './components/ProjectSettingTable';

const Container = styled.article`
  display: flex;
  flex-direction: column;
`;

const Card = styled.section`
  margin: 0 auto;
`;

export default function ProjectSettingsPage() {
  const projects = useAppSelector((state) => state.profile.projects);

  return (
    <BaseContainer>
      <h1>Your Projects</h1>
      <Container>
        {
          Object.keys(projects).map((key) => (
            <Card>
              <h2>{projects[key].name}</h2>
              <ProjectSettingTable project={projects[key]} />
            </Card>
          ))
        }
      </Container>
    </BaseContainer>
  );
}
