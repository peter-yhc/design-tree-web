import { createSlice } from '@reduxjs/toolkit';
import { fetchProfile } from '../profile/profile-store-requests';

interface InitialStateType {
    activeProjectId?: string;
    inEditMode: boolean;
    ready: boolean;
}

const { actions, reducer } = createSlice({
  name: 'system',
  initialState: {
    activeProjectId: undefined,
    inEditMode: false,
    ready: false,
  } as InitialStateType,
  reducers: {
    changeActiveProject: (state, action) => ({ ...state, activeProjectId: action.payload }),
    toggleEditMode: ((state, action) => ({ ...state, inEditMode: action.payload })),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.fulfilled, (state, action) => ({
      ...state,
      activeProjectId: state.activeProjectId ? state.activeProjectId : action.payload.projects[0].id,
      ready: true,
    }));
  },
});

export default { actions, reducer };
