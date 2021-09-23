import {
  PencilIcon, ArrowCircleRightIcon, DuplicateIcon, TrashIcon, XCircleIcon,
} from '@heroicons/react/outline';
import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import systemStore from 'store/system/system-store';
import Button from 'pages/components/button/Button';
import { useRouteMatch } from 'react-router-dom';

const Container = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  align-items: center;
  margin-right: ${(props) => props.theme.outerSpacing.small};
`;

const EditButton = styled.button`
  display: flex;
  cursor: pointer;
  border: 0;
  background-color: transparent;
`;

const ActionButton = styled(Button)`
  border: none;

  & > svg {
    margin-right: ${(props) => props.theme.outerSpacing.small}
  }

  &:hover {
    background-color: hsl(210,15%,91%);
  }
  
  &:active {
    background-color: hsl(210,15%,86%);
  }
`;

const Dialog = styled.div`
  position: fixed;
  top: 80px;
  right: ${(props) => props.theme.outerSpacing.medium};
  display: flex;
  flex-direction: column;
  border: 1px solid ${(props) => props.theme.colours.grey};
  border-radius: ${(props) => props.theme.system.borderRadius};
  padding: ${(props) => props.theme.innerSpacing.small} 0;
  background-color: ${(props) => props.theme.colours.white};
  transition: right ${(props) => props.theme.system.editModeTimings};
  z-index: 100;

  ${(props) => props.hidden && css`
    right: -200px;
  `}
`;

export default function EditDialog() {
  const dispatch = useDispatch();
  const inEditMode = useSelector((state: RootState) => state.system.inEditMode);
  const match = useRouteMatch();

  useEffect(() => {
    dispatch(systemStore.actions.toggleEditMode(false));
  }, [match]);

  const handleClose = () => {
    dispatch(systemStore.actions.toggleEditMode(false));
  };

  return (
    <Container>
      <EditButton onClick={() => dispatch(systemStore.actions.toggleEditMode(!inEditMode))}>
        <PencilIcon width="1.6em" />
      </EditButton>
      <Dialog hidden={!inEditMode}>
        <ActionButton>
          <ArrowCircleRightIcon width={20} />
          Move
        </ActionButton>
        <ActionButton>
          <TrashIcon width={20} />
          Delete
        </ActionButton>
        <ActionButton>
          <DuplicateIcon width={20} />
          Copy
        </ActionButton>
        <ActionButton onClick={handleClose}>
          <XCircleIcon width={20} />
          Close
        </ActionButton>
      </Dialog>
    </Container>
  );
}
