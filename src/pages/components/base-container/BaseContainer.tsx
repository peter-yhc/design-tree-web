import React from 'react';
import styled from 'styled-components';
import { SearchIcon, UserCircleIcon } from '@heroicons/react/outline';
import SideNav from './components/side-nav/SideNav';
import EditDialog from './components/edit-dialog/EditDialog';
import NavIndicator from './components/nav-indicator/NavIndicator';

const Container = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: ${(props) => props.theme.system.sideNavWidth} auto;
  grid-template-rows: 3.75rem auto;
  grid-template-areas: "nav header" "nav main";
  background-color: ${(props) => props.theme.colours.lightGrey};
`;

const Nav = styled(SideNav)`
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
  padding: ${(props) => props.theme.outerSpacing.medium};
  transition: all ease-in-out 150ms;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  padding-left: ${(props) => props.theme.outerSpacing.medium};
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
  padding-right: ${(props) => props.theme.outerSpacing.medium};
`;

const UserCircle = styled(UserCircleIcon)`
  color: ${(props) => props.theme.colours.black};
  width: 1.75rem;
`;

interface BaseContainerProps {
  children?: React.ReactNode,
}

export default function BaseContainer({ children }: BaseContainerProps) {
  return (
    <Container>
      <NavIndicator />
      <Nav />
      <Header>
        <SearchBox>
          <Search />
          <SearchField placeholder="Search..." />
        </SearchBox>
        <SecondaryLinks>
          <EditDialog />
          <UserCircle />
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
