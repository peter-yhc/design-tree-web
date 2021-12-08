import {
  ArrowCircleRightIcon, DuplicateIcon, PencilIcon, TrashIcon, XCircleIcon,
} from '@heroicons/react/outline';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import systemStore from 'store/system/system-store';
import Button from 'pages/components/button/Button';
import { removeSelectedImages } from 'store/images/images-store-requests';
import { useRoute } from 'hooks';
import SideActionButton from '../side-action-button/SideActionButton';

const Container = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  align-items: center;
  margin-right: ${(props) => props.theme.outerSpacing.small};
`;

const ActionButton = styled(Button)`
  border: none;
  border-radius: 0;

  & > svg {
    margin-right: ${(props) => props.theme.outerSpacing.small}
  }

  &:hover {
    background-color: hsl(210, 15%, 91%);
  }

  &:active {
    background-color: hsl(210, 15%, 86%);
  }
`;

const Dialog = styled.div`
  position: fixed;
  top: ${(props) => props.theme.system.topCornerDialogHeight};
  right: ${(props) => props.theme.outerSpacing.medium};
  display: flex;
  flex-direction: column;
  border: 1px solid ${(props) => props.theme.colours.grey};
  border-radius: ${(props) => props.theme.system.borderRadius};
  padding: ${(props) => props.theme.innerSpacing.small} 0;
  background-color: ${(props) => props.theme.colours.white};
  z-index: 100;
`;

export default function EditDialog() {
  const dispatch = useDispatch();
  const inEditMode = useSelector((state: RootState) => state.system.inEditMode);
  const { projectUid, collectionUid, focusUid } = useRoute();

  useEffect(() => {
    dispatch(systemStore.actions.closeAllDialogs());
  }, [projectUid, collectionUid, focusUid]);

  const handleDeleteImage = () => {
    dispatch(removeSelectedImages({ projectUid, locationUid: focusUid || collectionUid }));
  };

  const handleClose = () => {
    dispatch(systemStore.actions.closeAllDialogs());
  };

  return (
    <Container>
      <SideActionButton onClick={() => dispatch(systemStore.actions.toggleEditMode())} selected={inEditMode}>
        <PencilIcon width="1.6rem" />
      </SideActionButton>
      {inEditMode && (
        <Dialog>
          <ActionButton disabled>
            <ArrowCircleRightIcon width={20} />
            Move
          </ActionButton>
          <ActionButton onClick={handleDeleteImage}>
            <TrashIcon width={20} />
            Delete
          </ActionButton>
          <ActionButton disabled>
            <DuplicateIcon width={20} />
            Copy
          </ActionButton>
          <ActionButton onClick={handleClose}>
            <XCircleIcon width={20} />
            Close
          </ActionButton>
        </Dialog>
      )}
    </Container>
  );
}
