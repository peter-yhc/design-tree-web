/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { favouriteImage } from 'api/firebase-stub.api';
import { RootState } from '../index';
import { createImage, getImages, removeImages } from '../../api/server-api';
import { ImageInfo } from './images-store-interfaces';

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

export interface FavouriteStatus {
  hash: string;
  favourite: boolean;
}

const toggleImageFavourite = createAsyncThunk(
  'images/favourite',
  async (hash: string, thunkAPI): Promise<FavouriteStatus> => {
    const favourite: boolean = !(thunkAPI.getState() as RootState).images.currentImages[hash].metadata?.favourite || true;
    await favouriteImage({ hash, isFavourite: favourite });
    return { hash, favourite };
  },
);

export {
  fetchImages,
  uploadImage,
  removeSelectedImages,
  toggleImageFavourite,
};
