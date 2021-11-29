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
  focuss?: Collection[];
}

export interface Profile {
  projects: [{
    id: string,
    name: string,
    collections?: Collection[]
  }]
}

export {
  getImages,
  deleteImages,
  favouriteImage,
};
