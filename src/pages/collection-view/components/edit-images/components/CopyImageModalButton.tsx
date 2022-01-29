import React, { ReactNode, useState } from 'react';
import { useDispatch } from 'react-redux';
import { copySelectedImages } from 'store/forms/forms-store-requests';
import { useAppSelector } from 'store';
import { useRoute } from 'hooks';
import { FormName } from 'store/forms/FormName';
import ModalAction from 'pages/components/modal-action/ModalAction';
import { ListForm, ListItem, SubList } from './ListComponents';

export default function CopyImageModalButton({ className }: React.HtmlHTMLAttributes<HTMLElement>) {
  const dispatch = useDispatch();
  const { projectUid, locationUid } = useRoute();
  const [selected, setSelected] = useState<string | null>(null);
  const [toLocationUid, setToLocationUid] = useState<string | null>(null);
  const { collections, noSelectedImages } = useAppSelector((state) => ({
    collections: state.profile.projects[projectUid].collections,
    noSelectedImages: state.images.selectedImages.length === 0,
  }));

  const handleCopyImage = () => {
    if (toLocationUid) {
      dispatch(copySelectedImages({ projectUid, locationUid, toLocationUid }));
    }
  };

  const createHandleSelect = (cKey: string) => () => {
    setSelected(cKey);
    setToLocationUid(cKey);
  };

  const renderLocationsList = () => {
    const list: ReactNode[] = [];
    Object.keys(collections).forEach((cKey) => {
      list.push(<ListItem
        key={cKey}
        value={collections[cKey].name}
        name="location"
        onSelect={createHandleSelect(cKey)}
      />);
      if (collections[cKey].focuses) {
        const subItems = Object.keys(collections[cKey].focuses)
          .map((fKey) => (
            <ListItem
              $sub
              key={fKey}
              value={collections[cKey].focuses[fKey].name}
              name="location"
              onSelect={createHandleSelect(fKey)}
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
      label="Copy"
      formName={FormName.CopyImageForm}
      onSave={handleCopyImage}
      onCancel={() => setSelected(null)}
      saveValidity={toLocationUid !== null}
      disabled={noSelectedImages}
    >
      <h4>Copy Images</h4>
      <p>Select a collection or focus to copy the new images to.</p>
      <ListForm>
        {renderLocationsList()}
      </ListForm>
    </ModalAction>
  );
}
