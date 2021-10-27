/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createNewCollection, fetchProfile } from './profile-store-requests';
import { Profile } from '../../api/firebase-stub.api';

export interface CollectionType {
  name: string;
  subCategories: Record<string, SubCollectionType>;
}

export interface SubCollectionType {
  name: string;
}

export interface ProjectType {
  name: string;
  collections: Record<string, CollectionType>;
}

export interface InitialStateType {
  projects: Record<string, ProjectType>
}

const { actions, reducer } = createSlice({
  name: 'profile',
  initialState: {
    projects: {},
  } as InitialStateType,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.fulfilled, (state, action:PayloadAction<Profile>) => ({
      ...state,
      projects: action.payload.projects.reduce((projectAcc, project) => {
        projectAcc[project.id] = {
          name: project.name,
          collections: project.collections?.reduce((collectionAcc, collection) => {
            collectionAcc[collection.id] = {
              name: collection.name,
              subCategories: collection.subcollections?.reduce((subCollectionAcc, subCollection) => {
                subCollectionAcc[subCollection.id] = {
                  name: subCollection.name,
                };
                return subCollectionAcc;
              }, {} as Record<string, SubCollectionType>) || {},
            };
            return collectionAcc;
          }, {} as Record<string, CollectionType>) || {},
        };
        return projectAcc;
      }, {} as Record<string, ProjectType>),
    }));
    builder.addCase(createNewCollection.fulfilled, (state, action) => ({
      ...state,
      projects: {
        ...state.projects,
        [action.meta.arg.projectId]: {
          ...state.projects[action.meta.arg.projectId],
          [action.payload.id]: {
            name: action.payload.name,
          },
        },
      },
    }));
  },
});

export default {
  actions: { ...actions, fetchProfile }, reducer,
};
