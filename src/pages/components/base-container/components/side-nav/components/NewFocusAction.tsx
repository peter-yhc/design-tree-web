import React, {
  ChangeEvent, useEffect, useRef, useState,
} from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { createNewCollection, createNewFocus } from 'store/forms/forms-store-requests';
import { useAttachModalEscape, useProject } from 'hooks';
import { useAppSelector } from 'store';
import formsStore from 'store/forms/forms-store';
import Button from '../../../../button/Button';
import Input from '../../../../input/Input';

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

export default function NewFocusAction() {
  const dispatch = useDispatch();
  const { projectId, projectCategories } = useProject();
  const modalRef = useRef<HTMLDivElement>(null);
  const [modalHidden, setModalHidden] = useState(true);
  const [focusName, setFocusName] = useState('');
  const [parentCollectionUid, setParentCollectionUid] = useState(Object.keys(projectCategories)[0]);
  const formState = useAppSelector((state) => state.forms.newFocusForm.status);

  useAttachModalEscape(() => setModalHidden(true));

  useEffect(() => {
    if (formState === 'DONE') {
      setModalHidden(true);
      dispatch(formsStore.actions.resetNewFocusForm());
    }
  }, [formState]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const sanitisedText = e.target.value.match(/[A-Za-z0-9 ]+/);
    if (sanitisedText && e.target.value === sanitisedText[0]) {
      setFocusName(e.target.value);
    } else if (!sanitisedText) {
      setFocusName('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && focusName.length > 0 && formState === 'READY') {
      setFocusName('');
      dispatch(createNewCollection({ name: focusName, projectUid: projectId }));
    }
  };

  const renderCollectionSelect = () => Object.keys(projectCategories).map((key) => (
    <option value={key}>{projectCategories[key].name}</option>
  ));

  return (
    <>
      <Button inline onClick={() => setModalHidden(!modalHidden)}>
        + New Focus
      </Button>
      {
        !modalHidden && (
          <ModalBackground>
            <DialogModal ref={modalRef}>
              <h4>New Focus</h4>
              <p>A Focus is a specific area of a collection that you wish to concentrate on.</p>
              <select onChange={((event) => setParentCollectionUid(event.target.value))} defaultValue={Object.keys(projectCategories)[0]}>
                {renderCollectionSelect()}
              </select>
              <StyledInput
                label="Name your focus"
                placeholder="Sinks"
                pattern="/[A-Za-z0-9 ]/"
                value={focusName}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              <ButtonRow>
                <Button onClick={() => setModalHidden(true)}>Cancel</Button>
                <Button
                  primary
                  disabled={focusName.length === 0 || formState !== 'READY'}
                  onClick={() => {
                    setFocusName('');
                    dispatch(createNewFocus({ name: focusName, projectUid: projectId, collectionUid: parentCollectionUid }));
                  }}
                >
                  Save
                </Button>
              </ButtonRow>
            </DialogModal>
          </ModalBackground>
        )
      }
    </>
  );
}
