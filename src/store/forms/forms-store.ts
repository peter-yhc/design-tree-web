import { createSlice } from '@reduxjs/toolkit';
import { createNewCollection } from './forms-store-requests';

type FormStatus = 'READY' | 'PENDING' | 'FAILED' | 'DONE';

export type InitialState = {
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
    resetNewCollectionForm: (state) => ({
      ...state,
      newCollectionForm: {
        status: 'READY',
      },
    }),
  },
  extraReducers: (builder) => {
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
