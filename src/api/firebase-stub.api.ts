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
  favouriteImage,
};
