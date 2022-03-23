import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProjects } from './profile-store-requests';
import {
  createNewCollection,
  createNewFocus,
  createNewProject,
  renameCollectionAction, renameFocusAction
} from '../forms/forms-store-requests';
import { IProjectResponse } from '../../api/server-interfaces';

export interface CollectionType {
  name: string;
  uid: string;
  imageCount: number;
  createdAt: Date;
  lastActive: Date | null;
  focuses: Record<string, FocusType>;
}

export interface FocusType {
  name: string;
  uid: string;
  imageCount: number;
  createdAt: Date;
  lastActive: Date | null;
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
              ...collection,
              focuses: collection.focuses?.reduce((focusAcc, focus) => {
                focusAcc[focus.uid] = {
                  ...focus,
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
              ...action.payload,
              focuses: {},
            },
          },
        },
      },
    }));
    builder.addCase(createNewFocus.fulfilled, (state, action) => ({
      ...state,
      projects: {
        ...state.projects,
        [action.meta.arg.projectUid]: {
          ...state.projects[action.meta.arg.projectUid],
          collections: {
            ...state.projects[action.meta.arg.projectUid].collections,
            [action.meta.arg.collectionUid]: {
              ...state.projects[action.meta.arg.projectUid].collections[action.meta.arg.collectionUid],
              focuses: {
                ...state.projects[action.meta.arg.projectUid].collections[action.meta.arg.collectionUid].focuses,
                [action.payload.uid]: {
                  ...action.payload,
                },
              },
            },
          },
        },
      },
    }));
    builder.addCase(renameCollectionAction.fulfilled, (state, action) => {
      const { projectUid, collectionUid } = action.meta.arg;
      state.projects[projectUid].collections[collectionUid].name = action.payload.name;
    });
    builder.addCase(renameFocusAction.fulfilled, (state, action) => {
      const { projectUid, collectionUid, focusUid } = action.meta.arg;
      state.projects[projectUid].collections[collectionUid].focuses[focusUid].name = action.payload.name;
    });
  },
});

export default {
  actions: { ...actions }, reducer,
};
