import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { createNewCollection } from 'store/forms/forms-store-requests';
import { useProject } from 'hooks';
import { useAppSelector } from 'store';
import { FormName } from 'store/forms/FormName';
import { Input } from 'common-components';
import ModalAction from './ModalAction';

const StyledInput = styled(Input)`
  margin-top: ${(props) => props.theme.outerSpacing.large};
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${(props) => props.theme.outerSpacing.large};
`;

export default function NewCollectionAction() {
  const dispatch = useDispatch();
  const { projectId } = useProject();
  const [inputValue, setInputValue] = useState('');
  const formState = useAppSelector((state) => (state.forms as { [index: string]: any })[FormName.NewCollectionForm].status);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const sanitisedText = e.target.value.match(/[A-Za-z0-9 ]+/);
    if (sanitisedText && e.target.value === sanitisedText[0]) {
      setInputValue(e.target.value);
    } else if (!sanitisedText) {
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.length > 0 && formState === 'READY') {
      setInputValue('');
      dispatch(createNewCollection({ name: inputValue, projectUid: projectId }));
    }
  };

  const handleSave = () => {
    setInputValue('');
    dispatch(createNewCollection({ name: inputValue, projectUid: projectId }));
  };

  return (
    <ModalAction
      label="+ New Collection"
      formName={FormName.NewCollectionForm}
      onSave={handleSave}
      saveValidity={inputValue.length !== 0 || formState !== 'READY'}
    >
      <h4>New Collection</h4>
      <p>A collection is a set of images with a common theme.</p>
      <StyledInput
        label="Name your collection"
        placeholder="Kitchen"
        pattern="/[A-Za-z0-9 ]/"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <ButtonRow />
    </ModalAction>
  );
}
