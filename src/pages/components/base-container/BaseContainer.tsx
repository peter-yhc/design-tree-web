import React from 'react';
import styled from 'styled-components';
import SideNav from 'pages/components/side-nav/SideNav';

const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 250px auto;
`;

interface BaseContainerProps {
  children?: React.ReactNode,
}

export default function BaseContainer({ children }: BaseContainerProps) {
  return (
    <Container>
      <SideNav />
      {children}
    </Container>
  );
}

BaseContainer.defaultProps = {
  children: undefined,
};
