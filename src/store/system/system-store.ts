import { createSlice } from '@reduxjs/toolkit';

interface InitialStateType {
    activeProjectId?: string;
}

const { actions, reducer } = createSlice({
  name: 'system',
  initialState: {
    activeProjectId: 'taylor-home',
  } as InitialStateType,
  reducers: {
    changeActiveProject: (state, action) => ({ ...state, activeProjectId: action.payload }),
  },
});

export default { actions, reducer };
