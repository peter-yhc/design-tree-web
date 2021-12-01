/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../index';
import {
  createImage, getImages, removeImages, favouriteImage,
} from '../../api/server-api';
import { ImageInfo } from './images-store-interfaces';
import { IImageResponse } from '../../api/server-interfaces';

const fetchImages = createAsyncThunk(
  'images/fetch',
  async ({ projectUid, locationUid }: { projectUid: string, locationUid: string }) => await getImages({
    projectUid,
    locationUid,
  }) as ImageInfo[],
);

const uploadImage = createAsyncThunk(
  'images/upload',
  async ({ projectUid, locationUid, src }: { projectUid: string, locationUid: string, src: string }) => await createImage(
    projectUid,
    locationUid,
    src,
  ) as ImageInfo,
);

const removeSelectedImages = createAsyncThunk(
  'images/delete',
  async ({ projectUid, locationUid }: {projectUid: string, locationUid: string}, { getState }): Promise<void> => {
    const imageUids = (getState() as RootState).images.selectedImages;
    return removeImages(projectUid, locationUid, imageUids);
  },
);

const toggleImageFavourite = createAsyncThunk(
  'images/favourite',
  async ({ projectUid, locationUid, imageUid }: { projectUid: string, locationUid: string, imageUid: string }, thunkAPI): Promise<IImageResponse> => {
    const isFavourite: boolean = !(thunkAPI.getState() as RootState).images.currentImages[imageUid].metadata?.favourite;
    return favouriteImage(projectUid, locationUid, imageUid, isFavourite);
  },
);

export {
  fetchImages,
  uploadImage,
  removeSelectedImages,
  toggleImageFavourite,
};
