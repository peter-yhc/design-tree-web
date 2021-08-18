import { createSlice } from '@reduxjs/toolkit';

interface InitialStateType {
    activeProjectId?: string;
    inEditMode: boolean;
}

const { actions, reducer } = createSlice({
  name: 'system',
  initialState: {
    activeProjectId: 'taylor-home',
    inEditMode: false,
  } as InitialStateType,
  reducers: {
    changeActiveProject: (state, action) => ({ ...state, activeProjectId: action.payload }),
    toggleEditMode: ((state, action) => ({ ...state, inEditMode: action.payload })),
  },
});

export default { actions, reducer };
