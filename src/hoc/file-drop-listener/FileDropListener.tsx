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

export default function FileDropListener({ children }: FileDropListenerProps) {
  const dispatch = useDispatch();

  const dragdropListener = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!event.dataTransfer.items) {
      return;
    }

    for (let i = 0; i < event.dataTransfer.items.length; i += 1) {
      // If dropped items aren't valid html, reject them
      if (event.dataTransfer.items[i].type === 'text/html') {
        event.dataTransfer.items[i].getAsString((data) => {
          const tempDocument = document.createElement('html');
          tempDocument.innerHTML = data;
          const imageUrl = tempDocument.getElementsByTagName('img')[0].getAttribute('src');
          const imageName = imageUrl?.split('/').pop();

          if (imageUrl && imageName) {
            dispatch(imageStore.actions.addImage({
              name: imageName,
              hash: b64EncodeUnicode(`${imageName}${imageUrl}`),
              src: imageUrl,
              addedDate: new Date(),
            } as ImageInfo));
          }
        });
        break;
      }
    }
  };

  const clipboardListener = (event: ClipboardEvent) => {
    let imageUrl;

    if (event?.clipboardData?.getData('text')) {
      imageUrl = event?.clipboardData?.getData('text');
    } else if (event?.clipboardData?.getData('text/html')) {
      const tempDocument = document.createElement('html');
      tempDocument.innerHTML = event?.clipboardData?.getData('text/html') || '';
      imageUrl = tempDocument.getElementsByTagName('img')[0].getAttribute('src');
    } else {
      return;
    }

    const imageName = imageUrl?.split('/').pop();
    if (imageUrl && imageName) {
      dispatch(imageStore.actions.addImage({
        name: imageName,
        hash: b64EncodeUnicode(`${imageName}${imageUrl}`),
        src: imageUrl,
        addedDate: new Date(),
      } as ImageInfo));
    }
  };

  useEffect(() => {
    window.addEventListener('paste', clipboardListener);
    return () => {
      window.removeEventListener('paste', clipboardListener);
    };
  }, []);
  return (
    <div
      // onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
      onDrop={dragdropListener}
    >
      {children}
    </div>
  );
}
