import React, { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import imageStore from 'store/images/images-store';
import { ImageInfo } from 'api/firebase-stub.api';
import { b64EncodeUnicode } from '../../utils';

interface FileDropListenerProps {
  children: ReactNode
}

declare global {
  // eslint-disable-next-line no-unused-vars
  interface WindowEventMap {
    paste: ClipboardEvent
  }
}

const dragdropListener = (type: string) => (event: React.DragEvent<HTMLDivElement>) => {
  event.preventDefault();
  event.stopPropagation();
  console.log(`${type} data`, event?.dataTransfer);

  if (event.dataTransfer.items) {
    // Use DataTransferItemList interface to access the file(s)
    for (let i = 0; i < event.dataTransfer.items.length; i += 1) {
      // If dropped items aren't files, reject them
      if (event.dataTransfer.items[i].kind === 'file') {
        const file = event.dataTransfer.items[i].getAsFile();
        console.log(`... file[${i}].name = ${file?.name}`);
      }
    }
  }
};

export default function FileDropListener({ children }: FileDropListenerProps) {
  const dispatch = useDispatch();

  const clipboardListener = (event: ClipboardEvent) => {
    let imageUrl = event?.clipboardData?.getData('text');
    if (!imageUrl) {
      imageUrl = event?.clipboardData?.getData('text/html')
        ?.split(' ')
        ?.find((el: string) => el.includes('src'))
        ?.replaceAll('"', '')
        ?.split('=')[1];
    }
    const imageName = imageUrl?.split('/').pop();
    dispatch(imageStore.actions.addImage({
      name: imageName,
      hash: b64EncodeUnicode(`${imageName}${imageUrl}`),
      src: imageUrl,
      addedDate: new Date(),
    } as ImageInfo));
  };

  useEffect(() => {
    window.addEventListener('paste', clipboardListener);
    return () => {
      window.removeEventListener('paste', clipboardListener);
    };
  }, []);
  return (
    <div
      onDragOver={dragdropListener('over')}
      onDrop={dragdropListener('drop')}
    >
      {children}
    </div>
  );
}
