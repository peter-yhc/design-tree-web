import { createSlice } from '@reduxjs/toolkit';

export interface CategoryType {
  id: string;
  name: string;
  subCategories: SubCategoryType[];
}
export interface SubCategoryType {
  id: string;
  name: string;
}

export interface ProjectType {
  id: string;
  name: string;
  categories: CategoryType[];
}

export interface InitialStateType {
  projects: ProjectType[];
}

const { actions, reducer } = createSlice({
  name: 'profile',
  initialState: {
    projects: [{
      id: 'taylor-home',
      name: 'Taylor Home',
      categories: [
        {
          name: 'Bathroom 1',
          id: 'bathroom-1',
          subCategories: [{
            name: 'Bathtubs',
            id: 'bathtubs',
          }],
        },
        {
          name: 'Bathroom 2',
          id: 'bathroom-2',
          subCategories: [],
        },
        {
          name: 'Kitchen',
          id: 'kitchen',
          subCategories: [{
            name: 'Cabinets',
            id: 'cabinets',
          }, {
            name: 'Windows',
            id: 'windows',
          }],
        },
        {
          name: 'Wardrobe',
          id: 'wardrobe',
          subCategories: [],
        },
      ],
    }, {
      name: 'Gardens',
      id: 'gardens',
      categories: [{
        name: 'Front Yard',
        id: 'front-yard',
        subCategories: [],
      }],
    }],
  } as InitialStateType,
  reducers: {},
});

export default {
  actions, reducer,
};
