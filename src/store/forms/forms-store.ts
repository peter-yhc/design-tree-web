import { createSlice } from '@reduxjs/toolkit';
import { createNewCollection, createNewProject } from './forms-store-requests';

type FormStatus = 'READY' | 'PENDING' | 'FAILED' | 'DONE';

export type InitialState = {
  newProjectForm: {
    status: FormStatus
  }
  newCollectionForm: {
    status: FormStatus
  }
}

const { actions, reducer } = createSlice({
  name: 'forms',
  initialState: {
    newCollectionForm: {
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
  },
});

export default { actions, reducer };
