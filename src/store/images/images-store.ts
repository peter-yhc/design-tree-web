import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImageInfo } from 'api/firebase-stub.api';
import { fetchImages } from './images-store-requests';
import systemStore from '../system/system-store';

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
    toggleSelectedImage: (state, action) => {
      if (state.selectedImages.includes(action.payload)) {
        state.selectedImages.filter((imageId) => imageId !== action.payload);
        return {
          ...state,
          selectedImages: state.selectedImages.filter((imageId) => imageId !== action.payload),
        };
      }
      return { ...state, selectedImages: [...state.selectedImages, action.payload] };
    },
    addImage: (state, action:PayloadAction<ImageInfo>) => ({
      ...state,
      currentImages: {
        ...state.currentImages,
        [action.payload.hash]: {
          ...action.payload,
        },
      },
    }),
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
    builder.addCase(systemStore.actions.toggleEditMode, (state, action) => {
      if (!action.payload) {
        return { ...state, selectedImages: [] };
      }
      return state;
    });
  },
});

export default {
  actions: { ...actions, fetchImages },
  reducer,
};
