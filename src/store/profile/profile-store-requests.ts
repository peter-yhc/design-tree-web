import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  Collection, createCollection, getProfile, Profile,
} from '../../api/firebase-stub.api';

const fetchProfile = createAsyncThunk('profile/fetch',
  async () => await getProfile() as Profile);

const createNewCollection = createAsyncThunk(
  'profile/collection-create',
  async ({ name, projectId }: {name:string, projectId: string}): Promise<Collection> => createCollection(projectId, name),
);

export {
  fetchProfile,
  createNewCollection,
};
