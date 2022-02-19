import React from 'react';
import styled from 'styled-components';
import { UserCircleIcon } from '@heroicons/react/outline';
import { useAppSelector } from 'store';
import systemStore from 'store/system/system-store';
import { useDispatch } from 'react-redux';
import { resetApplication } from 'store/system/system-store-requests';
import Button from '../../../button/Button';
import CircleActionButton from '../circle-action-button/CircleActionButton';

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
      <CircleActionButton
        onClick={() => dispatch(systemStore.actions.toggleUserProfileMode())}
        selected={inUserProfileMode}
      >
        <UserCircle width="1.6rem" />
      </CircleActionButton>
      {inUserProfileMode && (
        <UserMenu>
          <Button onClick={() => dispatch(resetApplication())}>Logout</Button>
        </UserMenu>
      )}
    </Container>
  );
}
