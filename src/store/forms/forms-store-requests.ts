import { createAsyncThunk } from '@reduxjs/toolkit';
import { createCollection, createProject } from 'api/server-api';
import { IProjectResponse } from 'api/server-interfaces';

const createNewProject = createAsyncThunk(
  'profile/createProject',
  async ({ name }: {name:string}): Promise<IProjectResponse> => createProject({ name }),
);

const createNewCollection = createAsyncThunk(
  'profile/createCollection',
  async ({ name, projectUid }: {name:string, projectUid: string}): Promise<IProjectResponse> => createCollection({ name, projectUid }),
);

export {
  createNewProject,
  createNewCollection,
};
