import { createSlice } from '@reduxjs/toolkit';
import { ImageInfo } from 'api/firebase-stub.api';
import { fetchImages } from './images-store-requests';

export type InitialState = {
  images: Record<string, ImageInfo>
}

const { actions, reducer } = createSlice({
  name: 'images',
  initialState: {
    images: {},
  } as InitialState,
  reducers: {
    clear: (state) => ({ ...state, images: {} }),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchImages.pending, (state) => ({ ...state, images: {} }));
    builder.addCase(fetchImages.fulfilled, (state, action) => {
      const images = action.payload.reduce((acc, image: ImageInfo) => {
        acc[image.hash] = image;
        return acc;
      }, {} as Record<string, ImageInfo>);
      return { ...state, images };
    });
  },
});

export default {
  actions: { ...actions, fetchImages },
  reducer,
};
