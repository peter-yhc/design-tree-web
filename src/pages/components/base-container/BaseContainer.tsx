import React from 'react';
import styled from 'styled-components';
import SideNav from 'pages/components/side-nav/SideNav';
import { Search } from 'react-feather';

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
  align-items: center;
  border-bottom: 1px ${(props) => props.theme.colours.grey} solid;
`;

const Main = styled.main`
  grid-area: main;
`;

interface BaseContainerProps {
  children?: React.ReactNode,
}

export default function BaseContainer({ children }: BaseContainerProps) {
  return (
    <Container>
      <Nav />
      <Header>
        <Search />
        {' '}
        Search ...
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
