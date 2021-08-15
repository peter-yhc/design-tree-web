import React, { HTMLAttributes } from 'react';
import systemStore from 'store/system/system-store';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useProject } from 'hooks';

const SelectBox = styled.select`
  margin-left: -4px;
  border: 0;
  background-color: transparent;
`;

export default function ProjectSelector({ className }: HTMLAttributes<HTMLSelectElement>) {
  const dispatch = useDispatch();
  const history = useHistory();
  const availableProjects = useSelector(
    (state: RootState) => Object.keys(state.profile.projects)
      .map((key) => ({ key, value: state.profile.projects[key].name })),
  );
  const { projectId } = useProject();

  const changeHandler = (e: React.FormEvent<HTMLSelectElement>) => {
    dispatch(systemStore.actions.changeActiveProject(e.currentTarget.value));
    history.push('/dashboard');
  };

  return (
    <SelectBox className={className} onChange={changeHandler}>
      {
        availableProjects.map((entry) => (
          <option key={entry.key} value={entry.key} selected={entry.key === projectId}>{entry.value}</option>
        ))
      }
    </SelectBox>
  );
}
