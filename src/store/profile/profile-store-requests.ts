import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  Category, createCategory, getProfile, Profile,
} from '../../api/firebase-stub.api';

const fetchProfile = createAsyncThunk('profile/fetch',
  async () => await getProfile() as Profile);

const createNewCategory = createAsyncThunk(
  'profile/category-create',
  async ({ name, projectId }: {name:string, projectId: string}): Promise<Category> => createCategory(projectId, name),
);

export {
  fetchProfile,
  createNewCategory,
};
