/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createNewCategory, fetchProfile } from './profile-store-requests';
import { Category, Profile } from '../../api/firebase-stub.api';

export interface CategoryType {
  name: string;
  subCategories: Record<string, SubCategoryType>;
}

export interface SubCategoryType {
  name: string;
}

export interface ProjectType {
  name: string;
  categories: Record<string, CategoryType>;
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
          categories: project.categories?.reduce((categoryAcc, category) => {
            categoryAcc[category.id] = {
              name: category.name,
              subCategories: category.subcategories?.reduce((subCategoryAcc, subcategory) => {
                subCategoryAcc[subcategory.id] = {
                  name: subcategory.name,
                };
                return subCategoryAcc;
              }, {} as Record<string, SubCategoryType>) || {},
            };
            return categoryAcc;
          }, {} as Record<string, CategoryType>) || {},
        };
        return projectAcc;
      }, {} as Record<string, ProjectType>),
    }));
    builder.addCase(createNewCategory.fulfilled, (state, action) => ({
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
