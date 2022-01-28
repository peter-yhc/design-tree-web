import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createNewCollection, createNewFocus, createNewProject, moveSelectedImages, passwordLogin,
} from './forms-store-requests';
import { resetApplication } from '../system/system-store-requests';
import { FormName } from './FormName';

type FormStatus = 'READY' | 'PENDING' | 'FAILED' | 'DONE';
type FormState = {
  status: FormStatus;
  error?: string;
}

export type InitialState = {
  [FormName.NewProjectForm]: FormState;
  [FormName.NewCollectionForm]: FormState;
  [FormName.NewFocusForm]: FormState;
  [FormName.LoginForm]: FormState;
  [FormName.MoveImageForm]: FormState;
}

const initialState: InitialState = {
  newProjectForm: {
    status: 'READY',
  },
  newCollectionForm: {
    status: 'READY',
  },
  newFocusForm: {
    status: 'READY',
  },
  loginForm: {
    status: 'READY',
  },
  moveImageForm: {
    status: 'READY',
  },
};

const { actions, reducer } = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    resetForm: (state, action: PayloadAction<FormName>) => ({
      ...state,
      [action.payload]: {
        status: 'READY',
      },
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(createNewProject.pending, (state) => ({
      ...state,
      newProjectForm: {
        status: 'PENDING',
      },
    }));
    builder.addCase(createNewProject.fulfilled, (state) => ({
      ...state,
      newProjectForm: {
        status: 'DONE',
      },
    }));
    builder.addCase(createNewCollection.pending, (state) => ({
      ...state,
      newCollectionForm: {
        status: 'PENDING',
      },
    }));
    builder.addCase(createNewCollection.fulfilled, (state) => ({
      ...state,
      newCollectionForm: {
        status: 'DONE',
      },
    }));
    builder.addCase(createNewFocus.pending, (state) => ({
      ...state,
      newFocusForm: {
        status: 'PENDING',
      },
    }));
    builder.addCase(createNewFocus.fulfilled, (state) => ({
      ...state,
      newFocusForm: {
        status: 'DONE',
      },
    }));
    builder.addCase(moveSelectedImages.pending, ((state) => ({
      ...state,
      [FormName.MoveImageForm]: {
        status: 'PENDING',
      },
    })));
    builder.addCase(moveSelectedImages.fulfilled, ((state) => ({
      ...state,
      [FormName.MoveImageForm]: {
        status: 'DONE',
      },
    })));
    builder.addCase(passwordLogin.rejected, (state) => ({
      ...state,
      loginForm: {
        status: 'FAILED',
        error: 'Bad username or password',
      },
    }));
    builder.addCase(passwordLogin.fulfilled, (state) => ({
      ...state,
      loginForm: {
        status: 'DONE',
      },
    }));
    builder.addCase(resetApplication.fulfilled, () => ({
      ...initialState,
    }));
  },
});

export default { actions, reducer };
