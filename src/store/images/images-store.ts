import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImageInfo } from 'api/firebase-stub.api';
import { FavouriteStatus, fetchImages, toggleImageFavourite } from './images-store-requests';
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
  },
});

export default {
  actions: { ...actions, fetchImages, toggleImageFavourite },
  reducer,
};
