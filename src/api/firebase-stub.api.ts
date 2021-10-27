import stub from './stub';

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

export interface Collection {
  id: string,
  name: string,
  subcollections?: Collection[];
}

export interface Profile {
  projects: [{
    id: string,
    name: string,
    collections?: Collection[]
  }]
}

async function getProfile(): Promise<Profile> {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve({
        projects: [{
          id: 'taylor-home',
          name: 'Taylor Home',
          collections: [{
            id: 'kitchen',
            name: 'Kitchen',
            subcollections: [{
              id: 'cabinets',
              name: 'Cabinets',
            }, {
              id: 'windows',
              name: 'Windows',
            }],
          }, {
            id: 'bathroom-1',
            name: 'Bathroom 1',
            subcollections: [{
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

async function createCollection(projectId: string, collectionName: string): Promise<Collection> {
  return new Promise((resolve) => {
    console.log(projectId, collectionName);
    setTimeout(() => {
      resolve({ name: collectionName, id: 'some-random-id' });
    }, 500);
  });
}

export {
  getImages,
  deleteImages,
  favouriteImage,
  getProfile,
  createCollection,
};
