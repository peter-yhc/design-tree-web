import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchImages, removeSelectedImages, toggleImageFavourite, uploadImage,
} from './images-store-requests';
import systemStore from '../system/system-store';
import { ImageInfo } from './images-store-interfaces';
import { IImageResponse } from '../../api/server-interfaces';

export type InitialState = {
  currentImages: Record<string, ImageInfo>,
  selectedImages: string[],
  pendingImages: string[],
  currentPreviewUid?: string,
}

const { actions, reducer } = createSlice({
  name: 'images',
  initialState: {
    currentImages: {},
    selectedImages: [],
    pendingImages: [],
    currentPreviewUid: undefined,
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
    selectPreview: (state, action) => ({ ...state, currentPreviewUid: action.payload }),
    clearPreview: ((state) => ({ ...state, currentPreviewUid: undefined })),
    selectNextImage: (state) => {
      const keys = Object.keys(state.currentImages);
      const location = state.currentPreviewUid ? keys.indexOf(state.currentPreviewUid) : 0;
      return {
        ...state,
        currentPreviewUid: keys[(location + keys.length + 1) % keys.length],
      };
    },
    selectPreviousImage: (state) => {
      const keys = Object.keys(state.currentImages);
      const location = state.currentPreviewUid ? keys.indexOf(state.currentPreviewUid) : 0;
      return {
        ...state,
        currentPreviewUid: keys[(location + keys.length - 1) % keys.length],
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchImages.pending, (state) => ({ ...state, currentImages: {}, currentPreviewUid: undefined }));
    builder.addCase(fetchImages.fulfilled, (state, action) => {
      if (!action.payload) {
        return { ...state, currentImages: {} };
      }
      const imagesMap = action.payload.reduce((acc, image: ImageInfo) => {
        acc[image.uid] = image;
        return acc;
      }, {} as Record<string, ImageInfo>);
      return { ...state, currentImages: imagesMap };
    });
    builder.addCase(uploadImage.fulfilled, (state, action) => ({
      ...state,
      currentImages: {
        ...state.currentImages,
        [action.payload.uid]: action.payload,
      },
    }));
    builder.addCase(systemStore.actions.toggleEditMode, (state, action) => {
      if (!action.payload) {
        return { ...state, selectedImages: [] };
      }
      return state;
    });
    builder.addCase(toggleImageFavourite.fulfilled, (state, action: PayloadAction<IImageResponse>) => ({
      ...state,
      currentImages: {
        ...state.currentImages,
        [action.payload.uid]: action.payload,
      },
    }));
    builder.addCase(removeSelectedImages.pending, (state) => ({
      ...state,
      pendingImages: [...state.selectedImages],
    }));
    builder.addCase(removeSelectedImages.fulfilled, (state) => {
      const newCurrentImages = { ...state.currentImages };
      for (let i = 0; i < state.selectedImages.length; i += 1) {
        delete newCurrentImages[state.selectedImages[i]];
      }

      return {
        ...state,
        currentImages: newCurrentImages,
        selectedImages: [],
        pendingImages: [],
      };
    });
  },
});

export default {
  actions: {
    ...actions, fetchImages, removeSelectedImages,
  },
  reducer,
};
