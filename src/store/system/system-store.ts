import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProfile } from '../profile/profile-store-requests';

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
    setAuthenticated: (state, action: PayloadAction<AuthenticationState>) => ({ ...state, isAuthenticated: action.payload }),
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
