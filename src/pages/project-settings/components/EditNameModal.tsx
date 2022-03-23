import React, { HtmlHTMLAttributes, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { renameCollectionAction, renameFocusAction } from 'store/forms/forms-store-requests';
import formStore from 'store/forms/forms-store';
import { useAppSelector } from 'store';
import { FormName } from 'store/forms/FormName';
import {
  Button, Input, Modal, ModalBody, ModalFooter, ModalTitle, ModalTitleSub,
} from '../../../common-components';
import { EditModalTargetType } from './ModalTypes';

const Form = styled.form`
  margin-top: ${(props) => props.theme.outerSpacing.medium};
`;

interface EditNameModalProps extends HtmlHTMLAttributes<HTMLDivElement>{
  active: boolean;
  onTriggerClose: () => void;
  target: EditModalTargetType;
}

export default function EditNameModal({ active, onTriggerClose, target }: EditNameModalProps) {
  const dispatch = useDispatch();
  const { status } = useAppSelector((state) => state.forms[FormName.RenameFolderForm]);
  const [value, setValue] = useState(target.name);

  useEffect(() => {
    setValue(target.name);
  }, [target]);

  useEffect(() => {
    if (status === 'DONE') {
      dispatch(formStore.actions.resetForm(FormName.RenameFolderForm));
      onTriggerClose();
    }
  }, [status]);

  const handleSave = () => {
    dispatch(target.fuid
      ? renameFocusAction({
        name: value, projectUid: target.puid, collectionUid: target.cuid, focusUid: target.fuid,
      })
      : renameCollectionAction({ name: value, projectUid: target.puid, collectionUid: target.cuid }));
  };

  return (
    <Modal active={active} onTriggerClose={onTriggerClose} size="small">
      <ModalBody>
        <ModalTitle>{`Rename ${target?.name}?`}</ModalTitle>
        <ModalTitleSub>Give a new name to your folder</ModalTitleSub>
        <Form>
          <Input label="Name" placeholder="Next Garden Project" value={value} onChange={(e) => setValue(e.target.value)} />
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onTriggerClose}>Cancel</Button>
        <Button primary onClick={handleSave}>Save</Button>
      </ModalFooter>
    </Modal>
  );
}
