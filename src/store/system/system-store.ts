import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProjects } from '../../api/server-api';
import { IProjectResponse } from '../../api/server-interfaces';
import { resetApplication } from './system-store-requests';

const fetchProjects = createAsyncThunk(
  'profile/fetchProjects',
  async () => await getProjects() as IProjectResponse[],
);

interface InitialStateType {
  activeProjectId?: string;
  inEditMode: boolean;
  inUserProfileMode: boolean;
  ready: boolean;
}

const initialState: InitialStateType = {
  activeProjectId: undefined,
  inEditMode: false,
  inUserProfileMode: false,
  ready: false,
};

const { actions, reducer } = createSlice({
  name: 'system',
  initialState,
  reducers: {
    changeActiveProject: (state, action) => ({ ...state, activeProjectId: action.payload }),
    toggleEditMode: (state) => ({ ...state, inEditMode: !state.inEditMode, inUserProfileMode: false }),
    toggleUserProfileMode: (state) => ({ ...state, inEditMode: false, inUserProfileMode: !state.inUserProfileMode }),
    closeAllDialogs: (state) => ({ ...state, inEditMode: false }),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.fulfilled, (state, action) => ({
      ...state,
      activeProjectId: state.activeProjectId ? state.activeProjectId : action.payload[0].uid,
      ready: true,
    }));
    builder.addCase(fetchProjects.rejected, (state) => ({
      ...state,
      activeProjectId: state.activeProjectId ? state.activeProjectId : undefined,
      ready: true,
    }));
    builder.addCase(resetApplication.fulfilled, () => ({
      ...initialState,
    }));
  },
});

export default { actions, reducer };
