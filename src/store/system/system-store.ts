import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProjects } from '../../api/server-api';
import { IProjectResponse } from '../../api/server-interfaces';

const fetchProjects = createAsyncThunk(
  'profile/fetchProjects',
  async () => await getProjects() as IProjectResponse[],
);

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
  },
});

export default { actions, reducer };
