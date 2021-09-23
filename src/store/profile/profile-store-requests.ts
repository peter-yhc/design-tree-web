import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProfile, Profile } from '../../api/firebase-stub.api';

const fetchProfile = createAsyncThunk('profile/fetch',
  async () => await getProfile() as Profile);

export {
  fetchProfile,
};
