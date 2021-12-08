import { createSlice } from '@reduxjs/toolkit';
import {
  createNewCollection, createNewFocus, createNewProject, passwordLogin,
} from './forms-store-requests';
import { resetApplication } from '../system/system-store-requests';

type FormStatus = 'READY' | 'PENDING' | 'FAILED' | 'DONE';

export type InitialState = {
  newProjectForm: {
    status: FormStatus
  }
  newCollectionForm: {
    status: FormStatus
  }
  newFocusForm: {
    status: FormStatus
  }
  loginForm: {
    status: FormStatus,
    error?: string,
  }
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
};

const { actions, reducer } = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    resetNewProjectForm: (state) => ({
      ...state,
      newProjectForm: {
        status: 'READY',
      },
    }),
    resetNewCollectionForm: (state) => ({
      ...state,
      newCollectionForm: {
        status: 'READY',
      },
    }),
    resetNewFocusForm: (state) => ({
      ...state,
      newFocusForm: {
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
