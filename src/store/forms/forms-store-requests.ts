import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  copyImages,
  createCollection, createFocus, createProject, moveImages,
} from 'api/server-api';
import { ICollectionResponse, IFocusResponse, IProjectResponse } from 'api/server-interfaces';
import { loginWithEmailPassword } from '../../api/firebase-api';
import { Credentials } from './forms-store-interfaces';
import { RootState } from '../index';

const createNewProject = createAsyncThunk(
  'profile/createProject',
  async ({ name }: {name:string}): Promise<IProjectResponse> => createProject({ name }),
);

const createNewCollection = createAsyncThunk(
  'profile/createCollection',
  async ({ name, projectUid }: {name:string, projectUid: string}): Promise<ICollectionResponse> => createCollection({ name, projectUid }),
);

const createNewFocus = createAsyncThunk(
  'profile/createFocus',
  async ({ name, projectUid, collectionUid }: {name:string, projectUid: string, collectionUid:string}): Promise<IFocusResponse> => createFocus({ name, projectUid, collectionUid }),
);

const moveSelectedImages = createAsyncThunk(
  'images/move',
  async ({ projectUid, locationUid, newLocationUid }: {projectUid: string, locationUid: string, newLocationUid: string}, { getState }): Promise<void> => {
    const imageUids = (getState() as RootState).images.selectedImages;
    return moveImages(projectUid, locationUid, imageUids, newLocationUid);
  },
);

const copySelectedImages = createAsyncThunk(
  'images/copy',
  async ({ projectUid, locationUid, toLocationUid }: {projectUid: string, locationUid: string, toLocationUid: string}, { getState }): Promise<void> => {
    const imageUids = (getState() as RootState).images.selectedImages;
    return copyImages(projectUid, locationUid, imageUids, toLocationUid);
  },
);

const passwordLogin = createAsyncThunk(
  'system/passwordLogin',
  async (credentials: Credentials) => loginWithEmailPassword(credentials),
);

export {
  createNewProject,
  createNewCollection,
  createNewFocus,
  moveSelectedImages,
  copySelectedImages,
  passwordLogin,
};
