import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from 'store';
import SideNav from './components/side-nav/SideNav';
import UserProfileMenu from './components/user-profile-menu/UserProfileMenu';
import CircleActionButton from './components/circle-action-button/CircleActionButton';

const Container = styled.div<{responsiveMode: boolean}>`
  min-height: 100vh;
  display: grid;
  grid-template-columns: ${(props) => props.theme.system.sideNavWidth} auto;
  grid-template-rows: 3.75rem auto;
  grid-template-areas: "nav header" "nav main";
  background-color: ${(props) => props.theme.colours.lightGrey};
  
  ${(props) => props.responsiveMode && css`
    grid-template-columns: minmax(375px,100vw);
    grid-template-areas: "header" "main";
  `}
`;

const SideNavigation = styled(SideNav)`
  grid-area: nav;
`;

const ResponsiveSideNavContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: ${(props) => props.theme.colours.white};
  width: ${(props) => props.theme.system.sideNavWidth};
  z-index: ${(props) => props.theme.system.zIndex.responsiveNav};
  overflow-y: auto;
  overflow-x: hidden;
`;

const Header = styled.header`
  grid-area: header;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px ${(props) => props.theme.colours.grey} solid;
  padding: ${(props) => props.theme.innerSpacing.large};
`;

const Main = styled.main<{ highlight?: boolean }>`
  grid-area: main;
  padding: ${(props) => props.theme.innerSpacing.large};
  transition: all ease-in-out 150ms;
`;

const SecondaryLinks = styled.div`
  display: flex;
  align-items: center;
  column-gap: ${(props) => props.theme.innerSpacing.small};
`;

const SecondaryLink = styled(Link)`
  color: ${(props) => props.theme.colours.primary};
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    color: ${(props) => props.theme.colours.primaryDarkest};
  }
`;

const AdjustedCircleActionButton = styled(CircleActionButton)`
  margin-left: -0.65rem;
`;

const ResponsiveNavCloseButton = styled(CircleActionButton)`
  position: absolute;
  top: 0;
  right: 0;
  margin: 0.8rem;
`;

interface BaseContainerProps {
  children?: React.ReactNode,
}

export default function BaseContainer({ children }: BaseContainerProps) {
  const responsiveMode = useAppSelector((state) => state.system.responsiveMode);
  const [showPopupNav, setShowPopupNav] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setShowPopupNav(false);
  }, [location.pathname, responsiveMode]);

  return (
    <Container responsiveMode={responsiveMode}>
      { !responsiveMode && <SideNavigation /> }
      { responsiveMode && showPopupNav && (
        <ResponsiveSideNavContainer>
          <SideNavigation />
          <ResponsiveNavCloseButton onClick={() => setShowPopupNav(false)}>
            <XIcon width="1.4rem" />
          </ResponsiveNavCloseButton>
        </ResponsiveSideNavContainer>
      ) }
      <Header>
        <SecondaryLinks>
          { responsiveMode && (
            <AdjustedCircleActionButton onClick={() => setShowPopupNav(true)}>
              <MenuIcon width="1.6rem" />
            </AdjustedCircleActionButton>
          )}
          <SecondaryLink to="/project/settings">Project Settings</SecondaryLink>
        </SecondaryLinks>
        <UserProfileMenu />
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
