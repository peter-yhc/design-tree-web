import {
  applyMiddleware, combineReducers, compose, createStore,
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import profileStore from './profile/profile-store';
import systemStore from './system/system-store';
import imagesStore from './images/images-store';

const rootReducer = combineReducers({
  profile: profileStore.reducer,
  system: systemStore.reducer,
  images: imagesStore.reducer,
});

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
