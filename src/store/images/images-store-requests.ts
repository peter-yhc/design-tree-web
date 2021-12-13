/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createImage, getImages, removeImages, favouriteImage, putImageComment, removeImageComment,
} from 'api/server-api';
import { IImageResponse } from 'api/server-interfaces';
import { RootState } from '../index';
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
  async ({
    projectUid, locationUid, src, fileName,
  }: { projectUid: string, locationUid: string, src: string, fileName: string }) => await createImage(
    projectUid,
    locationUid,
    src,
    fileName,
  ) as ImageInfo,
);

const removeSelectedImages = createAsyncThunk(
  'images/delete',
  async ({ projectUid, locationUid }: {projectUid: string, locationUid: string}, { getState }): Promise<void> => {
    const imageUids = (getState() as RootState).images.selectedImages;
    return removeImages(projectUid, locationUid, imageUids);
  },
);

const removeImage = createAsyncThunk(
  'images/deleteSingle',
  async ({ projectUid, locationUid, imageUid }: {projectUid: string, locationUid: string, imageUid: string}): Promise<void> => removeImages(projectUid, locationUid, [imageUid]),
);

const toggleImageFavourite = createAsyncThunk(
  'images/favourite',
  async ({ projectUid, locationUid, imageUid }: { projectUid: string, locationUid: string, imageUid: string }, thunkAPI): Promise<IImageResponse> => {
    const isFavourite: boolean = !(thunkAPI.getState() as RootState).images.currentImages[imageUid].metadata?.favourite;
    return favouriteImage(projectUid, locationUid, imageUid, isFavourite);
  },
);

const updateImageComment = createAsyncThunk(
  'images/comment',
  async ({
    projectUid, locationUid, imageUid, comment,
  }: { projectUid: string, locationUid: string, imageUid: string, comment: string }): Promise<IImageResponse> => putImageComment(projectUid, locationUid, imageUid, comment),
);

const deleteImageComment = createAsyncThunk(
  'images/deleteComment',
  async ({ projectUid, locationUid, imageUid }: { projectUid: string, locationUid: string, imageUid: string }): Promise<IImageResponse> => removeImageComment(projectUid, locationUid, imageUid),
);

export {
  fetchImages,
  uploadImage,
  removeImage,
  removeSelectedImages,
  toggleImageFavourite,
  updateImageComment,
  deleteImageComment,
};
