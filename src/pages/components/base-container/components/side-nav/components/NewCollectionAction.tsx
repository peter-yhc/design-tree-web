import React, { ChangeEvent, useRef, useState } from 'react';
import styled from 'styled-components';
import Button from '../../../../button/Button';
import Input from '../../../../input/Input';
import { useAttachModalEscape } from '../../../../../../hooks';

const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: hsl(0, 0%, 30%, 0.85);
  z-index: 100;
`;

const DialogModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 101;
  width: 24rem;
  background-color: ${(props) => props.theme.colours.white};
  border-radius: ${(props) => props.theme.system.borderRadius};
  padding: ${(props) => props.theme.innerSpacing.large};
  box-shadow: 2px 2px 16px 0 hsl(0, 0%, 50%);
`;

const StyledInput = styled(Input)`
  margin-top: ${(props) => props.theme.outerSpacing.large};
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${(props) => props.theme.outerSpacing.large};
`;

export default function NewCollectionAction() {
  const modalRef = useRef<HTMLDivElement>(null);
  const [modalHidden, setModalHidden] = useState(true);
  const [inputValue, setInputValue] = useState<string>('');
  useAttachModalEscape(() => setModalHidden(true));

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const sanitisedText = e.target.value.match(/[A-Za-z0-9 ]+/);
    if (sanitisedText && e.target.value === sanitisedText[0]) {
      setInputValue(e.target.value);
    } else if (!sanitisedText) {
      setInputValue('');
    }
  };

  return (
    <>
      <Button inline onClick={() => setModalHidden(!modalHidden)}>
        + New Collection
      </Button>
      {
        !modalHidden && (
          <ModalBackground>
            <DialogModal ref={modalRef}>
              <h4>New Collection</h4>
              <p>A collection is a set of images with a common theme.</p>
              <StyledInput
                label="Name your collection"
                placeholder="eg. Kitchen"
                pattern="/[A-Za-z0-9 ]/"
                value={inputValue}
                onChange={handleInputChange}
              />
              <ButtonRow>
                <Button onClick={() => setModalHidden(true)}>Cancel</Button>
                <Button primary>Save</Button>
              </ButtonRow>
            </DialogModal>
          </ModalBackground>
        )
      }
    </>
  );
}
