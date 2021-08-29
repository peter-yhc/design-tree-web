/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getImages, ImageInfo } from 'api/firebase-stub.api';

const fetchImages = createAsyncThunk(
  'images/fetch',
  async (path: string) => await getImages(path) as ImageInfo[],
);

export {
  fetchImages,
};
