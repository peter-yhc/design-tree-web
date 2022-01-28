import { PencilIcon } from '@heroicons/react/outline';
import React, { ReactNode, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'store';
import systemStore from 'store/system/system-store';
import Button from 'pages/components/button/Button';
import { removeSelectedImages } from 'store/images/images-store-requests';
import { useRoute } from 'hooks';
import SideActionButton from 'pages/components/base-container/components/side-action-button/SideActionButton';
import ModalAction from '../../../components/modal-action/ModalAction';
import { SubList, ListForm, ListItem } from './components/ListComponents';

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

const ModalActionButton = styled(ModalAction)`
  ${buttonHovers}
`;

export default function EditImageToolbar() {
  const dispatch = useDispatch();
  const { projectUid, collectionUid, focusUid } = useRoute();
  const { inEditMode, collections, noSelectedImages } = useAppSelector((state) => ({
    inEditMode: state.system.inEditMode,
    collections: state.profile.projects[projectUid].collections,
    noSelectedImages: state.images.selectedImages.length === 0,
  }));
  const [selected, setSelected] = useState('');

  useEffect(() => {
    dispatch(systemStore.actions.closeAllDialogs());
  }, [projectUid, collectionUid, focusUid]);

  const handleDeleteImage = () => {
    dispatch(removeSelectedImages({ projectUid, locationUid: focusUid || collectionUid }));
  };

  const saveMoveImagesButton = (
    <Button primary>Save</Button>
  );

  const renderLocationsList = () => {
    const list: ReactNode[] = [];
    Object.keys(collections).forEach((cKey) => {
      list.push(<ListItem key={cKey} value={collections[cKey].name} name="location" onSelect={() => setSelected(cKey)} />);
      if (collections[cKey].focuses) {
        const subItems = Object.keys(collections[cKey].focuses).map((fKey) => (
          <ListItem
            $sub
            key={fKey}
            value={collections[cKey].focuses[fKey].name}
            name="location"
            onSelect={() => setSelected(cKey)}
          />
        ));
        list.push(<SubList $open={cKey === selected}>{subItems}</SubList>);
      }
    });
    return list;
  };

  return (
    <Container>
      {inEditMode && (
        <>
          <ModalActionButton label="Move" saveButton={saveMoveImagesButton} disabled={noSelectedImages}>
            <h4>Move Images</h4>
            <p>Select a collection or focus to move the new images to.</p>
            <ListForm>
              {renderLocationsList()}
            </ListForm>
          </ModalActionButton>
          <ActionButton inline onClick={handleDeleteImage} disabled={noSelectedImages}>
            Copy
          </ActionButton>
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
