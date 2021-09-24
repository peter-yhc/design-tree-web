import stub from './stub';
import { CategoryType } from '../store/profile/profile-store';

export interface ImageMetaInfo {
  favourite?: boolean,
}

export interface ImageInfo {
  src: string,
  hash: string,
  name?: string,
  description?: string,
  addedDate: Date,
  metadata?: ImageMetaInfo,
}

async function getImages(path: string): Promise<ImageInfo[]> {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve(stub.imageData[path]),
      400,
    );
  });
}

async function deleteImages(hashes: string[]): Promise<void> {
  return new Promise((resolve) => {
    console.log('deleting hashes', hashes);
    setTimeout(
      () => resolve(),
      800,
    );
  });
}

async function favouriteImage({ hash, isFavourite }: { hash: string, isFavourite: boolean }): Promise<void> {
  console.log(hash, isFavourite);
  return new Promise((resolve) => {
    setTimeout(
      () => resolve(),
      400,
    );
  });
}

export interface Category {
  id: string,
  name: string,
  subcategories?: Category[];
}

export interface Profile {
  projects: [{
    id: string,
    name: string,
    categories?: Category[]
  }]
}

async function getProfile(): Promise<Profile> {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve({
        projects: [{
          id: 'taylor-home',
          name: 'Taylor Home',
          categories: [{
            id: 'kitchen',
            name: 'Kitchen',
            subcategories: [{
              id: 'cabinets',
              name: 'Cabinets',
            }, {
              id: 'windows',
              name: 'Windows',
            }],
          }, {
            id: 'bathroom-1',
            name: 'Bathroom 1',
            subcategories: [{
              id: 'bathtubs',
              name: 'Bathtubs',
            }],
          }, {
            id: 'bathroom-2',
            name: 'Bathroom 2',
          }, {
            id: 'wardrobe',
            name: 'Wardrobe',
          }],
        }],
      }),
      400,
    );
  });
}

async function createCategory(projectId: string, categoryName: string): Promise<Category> {
  return new Promise((resolve) => {
    console.log(projectId, categoryName);
    setTimeout(() => {
      resolve({ name: categoryName, id: 'some-random-id' });
    }, 500);
  });
}

export {
  getImages,
  deleteImages,
  favouriteImage,
  getProfile,
  createCategory,
};
