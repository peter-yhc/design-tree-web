import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import profileStore from './profile/profile-store';
import systemStore from './system/system-store';
import imagesStore from './images/images-store';

const rootReducer = combineReducers({
  profile: profileStore.reducer,
  system: systemStore.reducer,
  images: imagesStore.reducer,
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
export type RootState = ReturnType<typeof store.getState>;
