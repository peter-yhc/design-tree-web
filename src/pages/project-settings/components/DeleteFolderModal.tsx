import React, { HtmlHTMLAttributes } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCollectionAction, deleteFocusAction } from 'store/forms/forms-store-requests';
import { FormName } from 'store/forms/FormName';
import { useFormHook } from 'hooks';
import {
  Button, Modal, ModalBody, ModalFooter, ModalTitle, ModalTitleSub,
} from 'common-components';
import { EditModalTargetType } from './ModalTypes';

interface EditNameModalProps extends HtmlHTMLAttributes<HTMLDivElement> {
  active: boolean;
  onTriggerClose: () => void;
  target: EditModalTargetType;
}

export default function DeleteFolderModal({ active, onTriggerClose, target }: EditNameModalProps) {
  const dispatch = useDispatch();
  useFormHook(FormName.DeleteFolderForm, onTriggerClose);

  const handleDelete = () => {
    const params = {
      projectUid: target.puid,
      collectionUid: target.cuid,
      focusUid: target.fuid || '',
    };
    dispatch(target.fuid ? deleteFocusAction(params) : deleteCollectionAction(params));
  };

  return (
    <Modal active={active} onTriggerClose={onTriggerClose} size="small">
      <ModalBody>
        <ModalTitle>{`Delete ${target?.name}?`}</ModalTitle>
        <ModalTitleSub>This action is permanent. Please proceed with caution.</ModalTitleSub>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onTriggerClose}>Cancel</Button>
        <Button secondary onClick={handleDelete}>Delete</Button>
      </ModalFooter>
    </Modal>
  );
}
