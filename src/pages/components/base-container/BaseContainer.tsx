import React from 'react';
import styled, { css } from 'styled-components';
import { SearchIcon, UserCircleIcon } from '@heroicons/react/outline';
import { useSelector } from 'react-redux';
import SideNav from './components/side-nav/SideNav';
import EditDialog from './components/edit-dialog/EditDialog';
import { RootState } from '../../../store';

const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: ${(props) => props.theme.system.sideNavWidth} auto;
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

interface MainProps {
  highlight?: boolean
}

const Main = styled.main<MainProps>`
  grid-area: main;
  padding: ${(props) => props.theme.outerSpacing.medium};
  transition: all ease-in-out 150ms;
  
  ${(props) => props.highlight && css`
    box-shadow: inset 0 0 2px 1px ${props.theme.colours.secondary};
  `};
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
  const editMode = useSelector((state: RootState) => state.system.inEditMode);

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
      <Main highlight={editMode}>
        {children}
      </Main>
    </Container>
  );
}

BaseContainer.defaultProps = {
  children: undefined,
};
