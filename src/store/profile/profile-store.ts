/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProjects } from './profile-store-requests';
import { createNewCollection, createNewProject } from '../forms/forms-store-requests';
import { IProjectResponse } from '../../api/server-interfaces';

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
    builder.addCase(fetchProjects.fulfilled, (state, action: PayloadAction<IProjectResponse[]>) => ({
      ...state,
      projects: action.payload.reduce((projectAcc, project) => {
        projectAcc[project.uid] = {
          name: project.name,
          collections: project.collections?.reduce((collectionAcc, collection) => {
            collectionAcc[collection.uid] = {
              name: collection.name,
              focuses: collection.focuses?.reduce((focusAcc, focus) => {
                focusAcc[focus.uid] = {
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
