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
  border: 1px solid ${(props) => props.theme.colours.grey};
  background-color: ${(props) => props.theme.colours.white};
  transition: all linear 150ms;
  margin-bottom: ${(props) => props.theme.outerSpacing.small};

  & > svg {
    margin-right: ${(props) => props.theme.outerSpacing.small}
  }

  &:hover {
    border: 1px solid ${(props) => props.theme.colours.secondary};
  }
  
  &:first-child {
    margin-top: ${(props) => props.theme.outerSpacing.medium};
  }
`;

const Dialog = styled.div`
  position: fixed;
  top: 59px;
  right: ${(props) => props.theme.outerSpacing.medium};
  display: flex;
  flex-direction: column;
  transition: right ${(props) => props.theme.system.editModeTimings};
  
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
        <ActionButton>
          <XCircleIcon width={20} />
          Close
        </ActionButton>
      </Dialog>
    </Container>
  );
}
