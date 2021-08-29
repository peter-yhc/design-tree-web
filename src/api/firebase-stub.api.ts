import stub from './stub';

export type ImageInfo = {
  src: string,
  hash: string,
  name?: string,
  description?: string,
  addedDate: Date,
}

async function getImages(path: string): Promise<ImageInfo[]> {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve(stub.imageData[path]),
      400,
    );
  });
}

export {
  getImages,
};
