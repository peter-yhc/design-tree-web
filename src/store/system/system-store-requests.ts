import { createAsyncThunk } from '@reduxjs/toolkit';
import { logout } from '../../api/firebase-api';

const resetApplication = createAsyncThunk(
  'system/resetApplication',
  async () => logout(),
);

export {
  resetApplication,
};
