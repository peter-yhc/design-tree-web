import { combineReducers, createStore } from 'redux';
import profileStore from './profile/profile-store';

// Use ES6 object literal shorthand syntax to define the object shape
const rootReducer = combineReducers({ profile: profileStore.reducer });

const store = createStore(rootReducer);

export default store;
export type RootState = ReturnType<typeof store.getState>;
