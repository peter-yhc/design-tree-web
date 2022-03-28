import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  copySelectedImages,
  createNewCollection,
  createNewFocus,
  createNewProject, deleteCollectionAction, deleteFocusAction,
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
  [FormName.DeleteFolderForm]: FormState;
  [FormName.LoginForm]: FormState;
  [FormName.MoveImageForm]: FormState;
  [FormName.CopyImageForm]: FormState;
}

const initialState: InitialState = {
  [FormName.NewProjectForm]: { status: 'READY' },
  [FormName.NewCollectionForm]: { status: 'READY' },
  [FormName.NewFocusForm]: { status: 'READY' },
  [FormName.RenameFolderForm]: { status: 'READY' },
  [FormName.DeleteFolderForm]: { status: 'READY' },
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
    builder
      .addCase(createNewProject.pending, (state) => {
        state[FormName.NewProjectForm].status = 'PENDING';
      })
      .addCase(createNewProject.fulfilled, (state) => {
        state[FormName.NewProjectForm].status = 'DONE';
      })
      .addCase(createNewCollection.pending, (state) => {
        state[FormName.NewCollectionForm].status = 'PENDING';
      })
      .addCase(createNewCollection.fulfilled, (state) => {
        state[FormName.NewCollectionForm].status = 'DONE';
      })
      .addCase(renameCollectionAction.pending, (state) => {
        state[FormName.RenameFolderForm].status = 'PENDING';
      })
      .addCase(renameCollectionAction.fulfilled, (state) => {
        state[FormName.RenameFolderForm].status = 'DONE';
      })
      .addCase(deleteCollectionAction.pending, (state) => {
        state[FormName.DeleteFolderForm].status = 'PENDING';
      })
      .addCase(deleteCollectionAction.fulfilled, (state) => {
        state[FormName.DeleteFolderForm].status = 'DONE';
      })
      .addCase(createNewFocus.pending, (state) => {
        state[FormName.NewFocusForm].status = 'PENDING';
      })
      .addCase(createNewFocus.fulfilled, (state) => {
        state[FormName.NewFocusForm].status = 'DONE';
      })
      .addCase(renameFocusAction.pending, (state) => {
        state[FormName.RenameFolderForm].status = 'PENDING';
      })
      .addCase(renameFocusAction.fulfilled, (state) => {
        state[FormName.RenameFolderForm].status = 'DONE';
      })
      .addCase(deleteFocusAction.pending, (state) => {
        state[FormName.DeleteFolderForm].status = 'PENDING';
      })
      .addCase(deleteFocusAction.fulfilled, (state) => {
        state[FormName.DeleteFolderForm].status = 'DONE';
      })
      .addCase(moveSelectedImages.pending, ((state) => {
        state[FormName.MoveImageForm].status = 'PENDING';
      }))
      .addCase(moveSelectedImages.fulfilled, ((state) => {
        state[FormName.MoveImageForm].status = 'DONE';
      }))
      .addCase(copySelectedImages.pending, ((state) => {
        state[FormName.CopyImageForm].status = 'PENDING';
      }))
      .addCase(copySelectedImages.fulfilled, ((state) => {
        state[FormName.CopyImageForm].status = 'DONE';
      }))
      .addCase(passwordLogin.rejected, (state) => ({
        ...state,
        loginForm: {
          status: 'FAILED',
          error: 'Bad username or password',
        },
      }))
      .addCase(passwordLogin.fulfilled, (state) => {
        state[FormName.LoginForm].status = 'DONE';
      })
      .addCase(resetApplication.fulfilled, () => ({
        ...initialState,
      }));
  },
});

export default { actions, reducer };
