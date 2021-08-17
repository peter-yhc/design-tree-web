import React from 'react';
import styled from 'styled-components';
import SideNav from 'pages/components/side-nav/SideNav';
import { SearchIcon, UserCircleIcon, PencilIcon } from '@heroicons/react/outline';
import EditDialog from '../edit-dialog/EditDialog';

const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 250px auto;
  grid-template-rows: 60px auto;
  grid-template-areas: "nav header" "nav main";
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

const Main = styled.main`
  grid-area: main;
  padding: ${(props) => props.theme.outerSpacing.medium}
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  padding-left: ${(props) => props.theme.outerSpacing.medium};
`;

const Search = styled(SearchIcon)`
  color: ${(props) => props.theme.colours.grey};
  width: 1.6em;
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
  width: 1.75em;
`;

interface BaseContainerProps {
  children?: React.ReactNode,
}

export default function BaseContainer({ children }: BaseContainerProps) {
  return (
    <Container>
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
