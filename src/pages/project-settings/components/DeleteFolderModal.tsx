import React, { HtmlHTMLAttributes } from 'react';
import {
  Button, Modal, ModalBody, ModalFooter, ModalTitle, ModalTitleSub,
} from '../../../common-components';
import { EditModalTargetType } from './ModalTypes';

interface EditNameModalProps extends HtmlHTMLAttributes<HTMLDivElement>{
  active: boolean;
  onTriggerClose: () => void;
  target: EditModalTargetType;
}

export default function DeleteFolderModal({ active, onTriggerClose, target }: EditNameModalProps) {
  return (
    <Modal active={active} onTriggerClose={onTriggerClose} size="small">
      <ModalBody>
        <ModalTitle>{`Delete ${target?.name}?`}</ModalTitle>
        <ModalTitleSub>This action is permanent. Please proceed with caution.</ModalTitleSub>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onTriggerClose}>Cancel</Button>
        <Button secondary>Delete</Button>
      </ModalFooter>
    </Modal>
  );
}
