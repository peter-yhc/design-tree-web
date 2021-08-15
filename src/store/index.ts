import { combineReducers, createStore } from 'redux';
import profileStore from './profile/profile-store';
import systemStore from './system/system-store';

const rootReducer = combineReducers({
  profile: profileStore.reducer,
  system: systemStore.reducer,
});

const store = createStore(rootReducer);

export default store;
export type RootState = ReturnType<typeof store.getState>;
