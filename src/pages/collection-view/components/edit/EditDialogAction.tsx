import {
  CogIcon, PencilIcon, TrashIcon,
} from '@heroicons/react/outline';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import systemStore from 'store/system/system-store';
import Button from 'pages/components/button/Button';
import { removeSelectedImages } from 'store/images/images-store-requests';
import { useRoute } from 'hooks';
import SideActionButton from 'pages/components/base-container/components/side-action-button/SideActionButton';

const Container = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  align-items: center;
`;

const ActionButton = styled(Button)`
  border: none;
  border-radius: 0;

  & > svg {
    margin-right: ${(props) => props.theme.outerSpacing.small}
  }

  &:hover {
    text-shadow: 0 0 1px ${(props) => props.theme.colours.darkGrey};
  }

  &:active {
    text-shadow: 0 0 1px ${(props) => props.theme.colours.black};
  }
`;

const Dialog = styled.div`
  display: flex;
`;

export default function EditDialogAction() {
  const dispatch = useDispatch();
  const inEditMode = useSelector((state: RootState) => state.system.inEditMode);
  const { projectUid, collectionUid, focusUid } = useRoute();

  useEffect(() => {
    dispatch(systemStore.actions.closeAllDialogs());
  }, [projectUid, collectionUid, focusUid]);

  const handleDeleteImage = () => {
    dispatch(removeSelectedImages({ projectUid, locationUid: focusUid || collectionUid }));
  };

  return (
    <Container>
      {inEditMode && (
        <Dialog>
          {/* <ActionButton disabled> */}
          {/*  <ArrowCircleRightIcon width={20} /> */}
          {/*  Move */}
          {/* </ActionButton> */}
          <ActionButton onClick={handleDeleteImage}>
            <TrashIcon width={20} />
            Delete
          </ActionButton>
          {/* <ActionButton disabled> */}
          {/*  <DuplicateIcon width={20} /> */}
          {/*  Copy */}
          {/* </ActionButton> */}
          <ActionButton onClick={handleDeleteImage}>
            <CogIcon width={20} />
            Settings
          </ActionButton>
        </Dialog>
      )}
      <SideActionButton onClick={() => dispatch(systemStore.actions.toggleEditMode())} selected={inEditMode}>
        <PencilIcon width="1.6rem" />
      </SideActionButton>
    </Container>
  );
}
