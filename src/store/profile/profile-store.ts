import { createSlice } from '@reduxjs/toolkit';

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
    projects: {
      'taylor-home': {
        name: 'Taylor Home',
        categories: {
          'bathroom-1': {
            name: 'Bathroom 1',
            subCategories: {
              bathtubs: {
                name: 'Bathtubs',
              },
            },
          },
          'bathroom-2': {
            name: 'Bathroom 2',
            subCategories: {},
          },
          kitchen: {
            name: 'Kitchen',
            subCategories: {
              cabinets: {
                name: 'Cabinets',
              },
              windows: {
                name: 'Windows',
              },
            },
          },
          wardrobe: {
            name: 'Wardrobe',
            subCategories: {},
          },
        },
      },
      gardens: {
        name: 'Gardens',
        categories: {
          'front-yard': {
            name: 'Front Yard',
            subCategories: {},
          },
        },
      },
    },
  } as InitialStateType,
  reducers: {},
});

export default {
  actions, reducer,
};
