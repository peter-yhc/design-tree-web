import { createSlice } from '@reduxjs/toolkit';
import { createNewCollection, createNewFocus, createNewProject } from './forms-store-requests';

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
}

const { actions, reducer } = createSlice({
  name: 'forms',
  initialState: {
    newProjectForm: {
      status: 'READY',
    },
    newCollectionForm: {
      status: 'READY',
    },
    newFocusForm: {
      status: 'READY',
    },
  } as InitialState,
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
  },
});

export default { actions, reducer };
