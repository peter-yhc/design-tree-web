import React, { ReactNode, useState } from 'react';
import { useDispatch } from 'react-redux';
import { moveSelectedImages } from 'store/forms/forms-store-requests';
import { useAppSelector } from 'store';
import { useRoute } from 'hooks';
import { FormName } from 'store/forms/FormName';
import ModalAction from 'pages/components/modal-action/ModalAction';
import { ListForm, ListItem, SubList } from './ListComponents';

export default function MoveImageModalButton({ className }: React.HtmlHTMLAttributes<HTMLElement>) {
  const dispatch = useDispatch();
  const { projectUid, locationUid } = useRoute();
  const [selected, setSelected] = useState<string | null>(null);
  const [newLocationUid, setNewLocationUid] = useState<string | null>(null);
  const { collections, noSelectedImages } = useAppSelector((state) => ({
    collections: state.profile.projects[projectUid].collections,
    noSelectedImages: state.images.selectedImages.length === 0,
  }));

  const handleMoveImage = () => {
    if (newLocationUid) {
      dispatch(moveSelectedImages({ projectUid, locationUid, newLocationUid }));
    }
  };

  const createHandleSelect = (collectionKey: string, locationKey: string) => () => {
    setSelected(collectionKey);
    setNewLocationUid(locationKey);
  };

  const renderLocationsList = () => {
    const list: ReactNode[] = [];
    Object.keys(collections).forEach((cKey) => {
      list.push(<ListItem
        key={cKey}
        value={collections[cKey].name}
        name="location"
        onSelect={createHandleSelect(cKey, cKey)}
      />);
      if (collections[cKey].focuses) {
        const subItems = Object.keys(collections[cKey].focuses)
          .map((fKey) => (
            <ListItem
              $sub
              key={fKey}
              value={collections[cKey].focuses[fKey].name}
              name="location"
              onSelect={createHandleSelect(cKey, fKey)}
            />
          ));
        list.push(<SubList $open={cKey === selected}>{subItems}</SubList>);
      }
    });
    return list;
  };

  return (
    <ModalAction
      className={className}
      label="Move"
      formName={FormName.MoveImageForm}
      onSave={handleMoveImage}
      onCancel={() => setSelected(null)}
      saveValidity={newLocationUid !== null}
      disabled={noSelectedImages}
    >
      <h4>Move Images</h4>
      <p>Select a collection or focus to move the new images to.</p>
      <ListForm>
        {renderLocationsList()}
      </ListForm>
    </ModalAction>
  );
}
