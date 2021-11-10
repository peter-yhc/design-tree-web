import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';
import Logo from 'assets/images/Logo.svg';
import { Link, useLocation } from 'react-router-dom';
import { useProject } from 'hooks';
import { logout } from 'api/firebase-api';
import Button from 'pages/components/button/Button';
import ProjectSelector from './components/ProjectSelector';
import NewCollectionAction from './components/NewCollectionAction';

const Nav = styled.nav`
  height: 100%;
  border-right: 1px ${(props) => props.theme.colours.grey} solid;
  padding: ${(props) => props.theme.innerSpacing.large};
  display: grid;
  grid-template-rows: calc(60px - ${(props) => props.theme.innerSpacing.large}) 5em min-content;
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

const SubCategories = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: ${(props) => props.theme.outerSpacing.small};
`;

const SubCollectionLink = styled(CollectionLink)`
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

const NewCollectionContainer = styled.div`
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
      {Object.keys(collection.subCategories).length > 0
        && (
        <SubCategories>
          {Object.entries(collection.subCategories).map(([subId, subCollection]) => (
            <SubCollectionLink
              role="listitem"
              to={`/${projectId}/${id}/${subId}`}
              key={subId}
              active={(location.pathname === `/${projectId}/${id}/${subId}`).toString()}
            >
              {subCollection.name}
            </SubCollectionLink>
          ))}
        </SubCategories>
        )}
    </React.Fragment>
  ));

  return (
    <Nav className={className}>
      <LogoImage src={Logo} alt="" />
      <ProjectLabel>
        <h6>Current Project:</h6>
        <ActiveProjectSelector />
      </ProjectLabel>
      <Categories role="list">
        {renderCategories()}
      </Categories>
      <NewCollectionContainer>
        <NewCollectionAction />
      </NewCollectionContainer>
      <Button onClick={() => logout()}>Logout</Button>
    </Nav>
  );
}
