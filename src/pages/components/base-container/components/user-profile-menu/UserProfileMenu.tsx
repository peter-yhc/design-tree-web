import React from 'react';
import styled from 'styled-components';
import { UserCircleIcon } from '@heroicons/react/outline';
import { logout } from 'api/firebase-api';
import { useAppSelector } from 'store';
import systemStore from 'store/system/system-store';
import { useDispatch } from 'react-redux';
import Button from '../../../button/Button';
import SideActionButton from '../side-action-button/SideActionButton';

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const UserCircle = styled(UserCircleIcon)`
  color: ${(props) => props.theme.colours.black};
  width: 1.75rem;
  cursor: pointer;
`;

const UserMenu = styled.div`
  position: fixed;
  top: ${(props) => props.theme.system.topCornerDialogHeight};
  right: ${(props) => props.theme.outerSpacing.medium};
`;

export default function UserProfileMenu() {
  const inUserProfileMode = useAppSelector((state) => state.system.inUserProfileMode);
  const dispatch = useDispatch();

  return (
    <Container>
      <SideActionButton
        onClick={() => dispatch(systemStore.actions.toggleUserProfileMode())}
        selected={inUserProfileMode}
      >
        <UserCircle width="1.6rem" />
      </SideActionButton>
      {inUserProfileMode && (
        <UserMenu>
          <Button onClick={() => logout()}>Logout</Button>
        </UserMenu>
      )}
    </Container>
  );
}
