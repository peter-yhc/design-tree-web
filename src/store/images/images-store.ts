import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImageInfo } from 'api/firebase-stub.api';
import {
  FavouriteStatus, fetchImages, removeSelectedImages, toggleImageFavourite,
} from './images-store-requests';
import systemStore from '../system/system-store';

export type InitialState = {
  currentImages: Record<string, ImageInfo>,
  selectedImages: string[],
  pendingImages: string[],
}

const { actions, reducer } = createSlice({
  name: 'images',
  initialState: {
    currentImages: {},
    selectedImages: [],
    pendingImages: [],
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
    toggleImageFavourite: (state, action) => ({
      ...state,
      currentImages: {
        ...state.currentImages,
        [action.payload]: {
          ...state.currentImages[action.payload],
          metadata: {
            ...state.currentImages[action.payload].metadata,
            favourite: !state.currentImages[action.payload].metadata?.favourite || false,
          },
        },
      },
    }),
    addImage: (state, action: PayloadAction<ImageInfo>) => ({
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
      if (!action.payload) {
        return { ...state, currentImages: {} };
      }
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
    builder.addCase(toggleImageFavourite.fulfilled, (state, action: PayloadAction<FavouriteStatus>) => ({
      ...state,
      currentImages: {
        ...state.currentImages,
        [action.payload.hash]: {
          ...state.currentImages[action.payload.hash],
          metadata: {
            ...state.currentImages[action.payload.hash].metadata,
            favourite: !state.currentImages[action.payload.hash].metadata?.favourite || false,
          },
        },
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
    ...actions, fetchImages, toggleImageFavourite, removeSelectedImages,
  },
  reducer,
};
