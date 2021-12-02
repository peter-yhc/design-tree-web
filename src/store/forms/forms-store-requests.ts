import { createAsyncThunk } from '@reduxjs/toolkit';
import { createCollection, createFocus, createProject } from 'api/server-api';
import { ICollectionResponse, IFocusResponse, IProjectResponse } from 'api/server-interfaces';

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

export {
  createNewProject,
  createNewCollection,
  createNewFocus,
};
