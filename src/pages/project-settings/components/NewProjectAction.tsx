import React, {
  ChangeEvent, useEffect, useRef, useState,
} from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { createNewProject } from 'store/forms/forms-store-requests';
import { useAttachModalEscape } from 'hooks';
import { useAppSelector } from 'store';
import { FormName } from 'store/forms/FormName';
import formsStore from 'store/forms/forms-store';
import { Button, Input } from 'common-components';

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
  box-shadow: ${(props) => props.theme.system.boxShadow};
`;

const StyledInput = styled(Input)`
  margin-top: ${(props) => props.theme.outerSpacing.large};
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${(props) => props.theme.outerSpacing.large};
`;

export default function NewProjectAction() {
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement>(null);
  const [modalHidden, setModalHidden] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const formState = useAppSelector((state) => state.forms.newProjectForm.status);

  useAttachModalEscape(() => setModalHidden(true));

  useEffect(() => {
    if (formState === 'DONE') {
      setModalHidden(true);
      dispatch(formsStore.actions.resetForm(FormName.NewProjectForm));
    }
  }, [formState]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const sanitisedText = e.target.value.match(/[A-Za-z0-9 ]+/);
    if (sanitisedText && e.target.value === sanitisedText[0]) {
      setInputValue(e.target.value);
    } else if (!sanitisedText) {
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch(createNewProject({ name: inputValue }));
    }
  };

  return (
    <>
      <Button inline onClick={() => setModalHidden(!modalHidden)}>
        + New Project
      </Button>
      {
        !modalHidden && (
          <ModalBackground>
            <DialogModal ref={modalRef}>
              <h4>New Project</h4>
              <StyledInput
                label="Name your project"
                placeholder="Home Remodel"
                pattern="/[A-Za-z0-9 ]/"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              <ButtonRow>
                <Button onClick={() => setModalHidden(true)}>Cancel</Button>
                <Button primary onClick={() => dispatch(createNewProject({ name: inputValue }))}>Save</Button>
              </ButtonRow>
            </DialogModal>
          </ModalBackground>
        )
      }
    </>
  );
}
