import { createSlice } from '@reduxjs/toolkit';
import { ImageInfo } from 'api/firebase-stub.api';
import { fetchImages } from './images-store-requests';

export type InitialState = {
  currentImages: Record<string, ImageInfo>,
  selectedImages: string[],
}

const { actions, reducer } = createSlice({
  name: 'images',
  initialState: {
    currentImages: {},
    selectedImages: [],
  } as InitialState,
  reducers: {
    clear: (state) => ({ ...state, images: {} }),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchImages.pending, (state) => ({ ...state, currentImages: {} }));
    builder.addCase(fetchImages.fulfilled, (state, action) => {
      const imagesMap = action.payload.reduce((acc, image: ImageInfo) => {
        acc[image.hash] = image;
        return acc;
      }, {} as Record<string, ImageInfo>);
      return { ...state, currentImages: imagesMap };
    });
  },
});

export default {
  actions: { ...actions, fetchImages },
  reducer,
};
