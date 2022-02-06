import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';
import Logo from 'assets/images/Logo.svg';
import { Link, useLocation } from 'react-router-dom';
import { useProject } from 'hooks';
import ProjectSelector from './components/ProjectSelector';
import NewCollectionAction from './components/NewCollectionAction';
import NewFocusAction from './components/NewFocusAction';
import NavIndicator from './components/NavIndicator';

const Nav = styled.nav`
  height: 100%;
  border-right: 1px ${(props) => props.theme.colours.grey} solid;
  padding: ${(props) => props.theme.innerSpacing.large};
  display: grid;
  grid-template-rows: calc(60px - ${(props) => props.theme.innerSpacing.large}) 5em min-content auto;
`;

const LogoImage = styled.img`
  margin-right: ${(props) => props.theme.outerSpacing.small};
  margin-top: -0.3rem;
  width: 5.5rem;
`;

const Categories = styled.div`
  display: flex;
  flex-direction: column;
`;

interface CollectionLinkProps {
  active: string;
}

const CollectionLink = styled(Link)<CollectionLinkProps>`
  color: ${(props) => props.theme.colours.black};
  text-decoration: none;
  margin: 0 -${(props) => props.theme.innerSpacing.large};
  padding: ${(props) => `calc(${props.theme.outerSpacing.tiny} / 2)`} ${(props) => props.theme.innerSpacing.large};
  line-height: 1.35rem;

  &:hover {
    background-color: ${(props) => props.theme.system.sideNavHighlight}
  }
`;

const Focuses = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: ${(props) => props.theme.outerSpacing.small};
`;

const FocusLink = styled(CollectionLink)`
  padding-left: calc(${(props) => props.theme.outerSpacing.medium} + ${(props) => props.theme.innerSpacing.large});
  color: ${(props) => props.theme.colours.darkGrey};
`;

const ProjectLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ActiveProjectSelector = styled(ProjectSelector)`
  font-weight: 600;
`;

const ActionsContainer = styled.div`
  margin-top: ${(props) => props.theme.outerSpacing.medium}
`;

export default function SideNav({ className }: HTMLAttributes<HTMLDivElement>) {
  const { projectId, projectCategories } = useProject();
  const location = useLocation();

  const renderCategories = () => Object.entries(projectCategories).map(([id, collection]) => (
    <React.Fragment key={id}>
      <CollectionLink
        role="listitem"
        to={`/${projectId}/${id}`}
        active={(location.pathname === `/${projectId}/${id}`).toString()}
      >
        {collection.name}
      </CollectionLink>
      {Object.keys(collection.focuses).length > 0
      && (
        <Focuses>
          {Object.entries(collection.focuses).map(([subId, focus]) => (
            <FocusLink
              role="listitem"
              to={`/${projectId}/${id}/${subId}`}
              key={subId}
              active={(location.pathname === `/${projectId}/${id}/${subId}`).toString()}
            >
              {focus.name}
            </FocusLink>
          ))}
        </Focuses>
      )}
    </React.Fragment>
  ));

  return (
    <Nav className={className}>
      <LogoImage src={Logo} alt="" />
      <ProjectLabel>
        <h6>Current Project:</h6>
        {projectId ? <ActiveProjectSelector /> : <span>None available</span>}
      </ProjectLabel>
      {
        projectCategories && (
          <Categories role="list">
            {renderCategories()}
          </Categories>
        )
      }
      <ActionsContainer>
        {/* <NewProjectAction /> */}
        {projectId && <NewCollectionAction />}
        {projectId && <NewFocusAction />}
      </ActionsContainer>
      <NavIndicator />
    </Nav>
  );
}
