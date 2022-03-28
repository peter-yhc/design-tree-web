import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  copyImages,
  createCollection,
  createFocus,
  createProject,
  deleteCollection,
  deleteFocus,
  moveImages,
  renameCollection,
  renameFocus,
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

interface RenameCollectionActionProps {
  projectUid: string;
  collectionUid: string;
  name: string;
}

const renameCollectionAction = createAsyncThunk<ICollectionResponse, RenameCollectionActionProps>(
  'profile/renameCollection',
  async (params) => renameCollection(params),
);

interface DeleteCollectionActionProps {
  projectUid: string;
  collectionUid: string;
}

const deleteCollectionAction = createAsyncThunk<void, DeleteCollectionActionProps>(
  'profile/deleteCollection',
  async (params) => deleteCollection(params),
);

const createNewFocus = createAsyncThunk(
  'profile/createFocus',
  async ({ name, projectUid, collectionUid }: {name:string, projectUid: string, collectionUid:string}): Promise<IFocusResponse> => createFocus({ name, projectUid, collectionUid }),
);

interface RenameFocusActionProps {
  projectUid: string;
  collectionUid: string;
  focusUid: string;
  name: string;
}

const renameFocusAction = createAsyncThunk<ICollectionResponse, RenameFocusActionProps>(
  'profile/renameFocus',
  async (params) => renameFocus(params),
);

interface DeleteFocusActionProps {
  projectUid: string;
  collectionUid: string;
  focusUid: string;
}

const deleteFocusAction = createAsyncThunk<void, DeleteFocusActionProps>(
  'profile/deleteFocus',
  async (params) => deleteFocus(params),
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
  renameCollectionAction,
  deleteCollectionAction,
  createNewFocus,
  renameFocusAction,
  deleteFocusAction,
  moveSelectedImages,
  copySelectedImages,
  passwordLogin,
};
