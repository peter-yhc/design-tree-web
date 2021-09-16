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

async function favouriteImage({ hash, isFavourite }: { hash: string, isFavourite: boolean }): Promise<void> {
  console.log(hash, isFavourite);
  return new Promise((resolve) => {
    setTimeout(
      () => resolve(),
      400,
    );
  });
}

export {
  getImages,
  favouriteImage,
};
