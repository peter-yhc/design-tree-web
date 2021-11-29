import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProjects } from '../../api/server-api';
import { IProjectResponse } from '../../api/server-interfaces';

const fetchProjects = createAsyncThunk(
  'profile/fetchProjects',
  async () => await getProjects() as IProjectResponse[],
);

export {
  fetchProjects,
};
