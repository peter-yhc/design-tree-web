import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  copySelectedImages,
  createNewCollection,
  createNewFocus,
  createNewProject,
  moveSelectedImages,
  passwordLogin,
  renameCollectionAction,
  renameFocusAction,
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
  [FormName.RenameFolderForm]: FormState;
  [FormName.LoginForm]: FormState;
  [FormName.MoveImageForm]: FormState;
  [FormName.CopyImageForm]: FormState;
}

const initialState: InitialState = {
  [FormName.NewProjectForm]: { status: 'READY' },
  [FormName.NewCollectionForm]: { status: 'READY' },
  [FormName.NewFocusForm]: { status: 'READY' },
  [FormName.RenameFolderForm]: { status: 'READY' },
  [FormName.LoginForm]: { status: 'READY' },
  [FormName.MoveImageForm]: { status: 'READY' },
  [FormName.CopyImageForm]: { status: 'READY' },
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
    builder.addCase(renameCollectionAction.pending, (state) => {
      state[FormName.RenameFolderForm].status = 'PENDING';
    });
    builder.addCase(renameCollectionAction.fulfilled, (state) => {
      state[FormName.RenameFolderForm].status = 'DONE';
    });
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
    builder.addCase(renameFocusAction.pending, (state) => {
      state[FormName.RenameFolderForm].status = 'PENDING';
    });
    builder.addCase(renameFocusAction.fulfilled, (state) => {
      state[FormName.RenameFolderForm].status = 'DONE';
    });
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
    builder.addCase(copySelectedImages.pending, ((state) => ({
      ...state,
      [FormName.CopyImageForm]: {
        status: 'PENDING',
      },
    })));
    builder.addCase(copySelectedImages.fulfilled, ((state) => ({
      ...state,
      [FormName.CopyImageForm]: {
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
