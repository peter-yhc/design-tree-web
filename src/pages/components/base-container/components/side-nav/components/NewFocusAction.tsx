import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { createNewFocus } from 'store/forms/forms-store-requests';
import { useProject } from 'hooks';
import { useAppSelector } from 'store';
import { FormName } from 'store/forms/FormName';
import Input from '../../../../input/Input';
import ModalAction from '../../../../modal-action/ModalAction';

const StyledInput = styled(Input)`
  margin-top: ${(props) => props.theme.outerSpacing.large};
`;

export default function NewFocusAction() {
  const dispatch = useDispatch();
  const { projectId, projectCategories } = useProject();
  const [focusName, setFocusName] = useState('');
  const [parentCollectionUid, setParentCollectionUid] = useState(Object.keys(projectCategories)[0]);
  const formState = useAppSelector((state) => state.forms.newFocusForm.status);

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
      dispatch(createNewFocus({ name: focusName, projectUid: projectId, collectionUid: parentCollectionUid }));
    }
  };

  const renderCollectionSelect = () => Object.keys(projectCategories).map((key) => (
    <option key={key} value={key}>{projectCategories[key].name}</option>
  ));

  const handleSave = () => {
    setFocusName('');
    dispatch(createNewFocus({
      name: focusName,
      projectUid: projectId,
      collectionUid: parentCollectionUid,
    }));
  };

  return (
    <ModalAction
      label="+ New Focus"
      formName={FormName.NewFocusForm}
      onSave={handleSave}
      saveValidity={focusName.length === 0 || formState !== 'READY'}
    >
      <h4>New Focus</h4>
      <p>A Focus is a specific area of a collection that you wish to concentrate on.</p>
      <select
        onChange={((event) => setParentCollectionUid(event.target.value))}
        defaultValue={Object.keys(projectCategories)[0]}
      >
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
    </ModalAction>
  );
}
