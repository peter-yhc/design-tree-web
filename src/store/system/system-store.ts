import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getProjects } from '../../api/server-api';
import { IProjectResponse } from '../../api/server-interfaces';

const fetchProjects = createAsyncThunk(
  'profile/fetchProjects',
  async () => await getProjects() as IProjectResponse[],
);

// eslint-disable-next-line no-shadow
export enum AuthenticationState {
  // eslint-disable-next-line no-unused-vars
  Invalid, Valid, Working
}

interface InitialStateType {
  isAuthenticated: AuthenticationState;
  activeProjectId?: string;
  inEditMode: boolean;
  ready: boolean;
}

const { actions, reducer } = createSlice({
  name: 'system',
  initialState: {
    isAuthenticated: AuthenticationState.Invalid,
    activeProjectId: undefined,
    inEditMode: false,
    ready: false,
  } as InitialStateType,
  reducers: {
    changeActiveProject: (state, action) => ({ ...state, activeProjectId: action.payload }),
    toggleEditMode: ((state, action) => ({ ...state, inEditMode: action.payload })),
    setAuthenticated: (state, action: PayloadAction<AuthenticationState>) => ({
      ...state,
      isAuthenticated: action.payload,
    }),
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
