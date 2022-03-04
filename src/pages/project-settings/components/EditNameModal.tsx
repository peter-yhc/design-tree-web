import React, { HtmlHTMLAttributes } from 'react';
import styled from 'styled-components';
import {
  Button, Input, Modal, ModalBody, ModalFooter, ModalTitle, ModalTitleSub,
} from '../../../common-components';

const Form = styled.form`
  margin-top: ${(props) => props.theme.outerSpacing.medium};
`;

interface EditNameModalProps extends HtmlHTMLAttributes<HTMLDivElement>{
  active: boolean;
  onTriggerClose: () => void;
}

export default function EditNameModal({ active, onTriggerClose }: EditNameModalProps) {
  return (
    <Modal active={active} onTriggerClose={onTriggerClose} size="small">
      <ModalBody>
        <ModalTitle>Set name</ModalTitle>
        <ModalTitleSub>Give a new name to your folder</ModalTitleSub>
        <Form>
          <Input label="Name" placeholder="Next Garden Project" />
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onTriggerClose}>Cancel</Button>
        <Button primary>Save</Button>
      </ModalFooter>
    </Modal>
  );
}
