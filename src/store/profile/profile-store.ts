/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProfile } from './profile-store-requests';
import { Profile } from '../../api/firebase-stub.api';
import { createNewCollection, createNewProject } from '../forms/forms-store-requests';

export interface CollectionType {
  name: string;
  focuses: Record<string, FocusType>;
}

export interface FocusType {
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
              focuses: collection.focuss?.reduce((focusAcc, focus) => {
                focusAcc[focus.id] = {
                  name: focus.name,
                };
                return focusAcc;
              }, {} as Record<string, FocusType>) || {},
            };
            return collectionAcc;
          }, {} as Record<string, CollectionType>) || {},
        };
        return projectAcc;
      }, {} as Record<string, ProjectType>),
    }));
    builder.addCase(createNewProject.fulfilled, (state, action) => ({
      ...state,
      projects: {
        ...state.projects,
        [action.payload.uid]: {
          name: action.payload.name,
          collections: {},
        },
      },
    }));
    builder.addCase(createNewCollection.fulfilled, (state, action) => ({
      ...state,
      projects: {
        ...state.projects,
        [action.meta.arg.projectUid]: {
          ...state.projects[action.meta.arg.projectUid],
          collections: {
            ...state.projects[action.meta.arg.projectUid].collections,
            [action.payload.uid]: {
              name: action.payload.name,
              focuses: {},
            },
          },
        },
      },
    }));
  },
});

export default {
  actions: { ...actions }, reducer,
};
