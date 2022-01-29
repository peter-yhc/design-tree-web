import { PencilIcon } from '@heroicons/react/outline';
import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'store';
import systemStore from 'store/system/system-store';
import Button from 'pages/components/button/Button';
import { removeSelectedImages } from 'store/images/images-store-requests';
import { useRoute } from 'hooks';
import SideActionButton from 'pages/components/base-container/components/side-action-button/SideActionButton';
import MoveImageModalButton from './components/MoveImageModalButton';
import CopyImageModalButton from './components/CopyImageModalButton';

const Container = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  align-items: center;
  column-gap: ${(props) => props.theme.innerSpacing.small};
`;

const buttonHovers = css`
  &:hover {
    text-shadow: 0 0 1px ${(props) => props.theme.colours.darkGrey};
  }
`;

const ActionButton = styled(Button)`
  ${buttonHovers}
`;

const MoveImageButton = styled(MoveImageModalButton)`
  ${buttonHovers}
`;

const CopyImageButton = styled(CopyImageModalButton)`
  ${buttonHovers}
`;

export default function EditImageToolbar() {
  const dispatch = useDispatch();
  const { projectUid, locationUid } = useRoute();
  const { inEditMode, noSelectedImages } = useAppSelector((state) => ({
    inEditMode: state.system.inEditMode,
    noSelectedImages: state.images.selectedImages.length === 0,
  }));

  useEffect(() => {
    dispatch(systemStore.actions.closeAllDialogs());
  }, [projectUid, locationUid]);

  const handleDeleteImage = () => {
    dispatch(removeSelectedImages({ projectUid, locationUid }));
  };

  return (
    <Container>
      {inEditMode && (
        <>
          <MoveImageButton />
          <CopyImageButton />
          <ActionButton inline onClick={handleDeleteImage} disabled={noSelectedImages}>
            Delete
          </ActionButton>
        </>
      )}
      <SideActionButton onClick={() => dispatch(systemStore.actions.toggleEditMode())} selected={inEditMode}>
        <PencilIcon width="1.6rem" />
      </SideActionButton>
    </Container>
  );
}
