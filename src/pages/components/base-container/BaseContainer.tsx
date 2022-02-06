import React from 'react';
import styled, { css } from 'styled-components';
import { SearchIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import SideNav from './components/side-nav/SideNav';
import UserProfileMenu from './components/user-profile-menu/UserProfileMenu';
import { useResponsiveMode } from '../../../hooks';

const Container = styled.div<{responsiveMode: boolean}>`
  min-height: 100vh;
  display: grid;
  grid-template-columns: ${(props) => props.theme.system.sideNavWidth} auto;
  grid-template-rows: 3.75rem auto;
  grid-template-areas: "nav header" "nav main";
  background-color: ${(props) => props.theme.colours.lightGrey};
  
  ${(props) => props.responsiveMode && css`
    grid-template-columns: 100vw;
    grid-template-areas: "header" "main";
  `}
`;

const SideNavigation = styled(SideNav)`
  grid-area: nav;
`;

const Header = styled.header`
  grid-area: header;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px ${(props) => props.theme.colours.grey} solid;
`;

interface MainProps {
  highlight?: boolean
}

const Main = styled.main<MainProps>`
  grid-area: main;
  padding: ${(props) => props.theme.innerSpacing.large};
  transition: all ease-in-out 150ms;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  padding-left: ${(props) => props.theme.innerSpacing.large};
`;

const Search = styled(SearchIcon)`
  color: ${(props) => props.theme.colours.grey};
  width: 1.6rem;
`;

const SearchField = styled.input`
  border: 0;
  outline: none;
  color: ${(props) => props.theme.colours.black};
  margin-left: ${(props) => props.theme.outerSpacing.tiny};

  &::placeholder {
    color: ${(props) => props.theme.colours.darkGrey};
  }
`;

const SecondaryLinks = styled.div`
  display: flex;
  align-items: center;
  column-gap: ${(props) => props.theme.innerSpacing.small};
  padding-right: ${(props) => props.theme.outerSpacing.medium};
`;

const SecondaryLink = styled(Link)`
  color: ${(props) => props.theme.colours.black};
  text-decoration: none;
  font-weight: 500;
`;

interface BaseContainerProps {
  children?: React.ReactNode,
}

export default function BaseContainer({ children }: BaseContainerProps) {
  const responsiveMode = useResponsiveMode();
  return (
    <Container responsiveMode={responsiveMode}>
      <SideNavigation />
      <Header>
        <SearchBox>
          <Search />
          <SearchField placeholder="Search..." />
        </SearchBox>
        <SecondaryLinks>
          <SecondaryLink to="/project/settings">Project Settings</SecondaryLink>
          <UserProfileMenu />
        </SecondaryLinks>
      </Header>
      <Main>
        {children}
      </Main>
    </Container>
  );
}

BaseContainer.defaultProps = {
  children: undefined,
};
