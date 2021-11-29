import { Dispatch } from 'redux';
import React from 'react';
import { uploadImage } from '../../../store/images/images-store-requests';

const createDragdropListener = (dispatch: Dispatch<any>, successCB: () => void, projectUid: string, locationUid: string) => (event: React.DragEvent<HTMLDivElement>) => {
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
          dispatch(uploadImage({
            projectUid,
            locationUid,
            src: imageUrl,
          }));
          successCB();
        }
      });
      break;
    }
  }
};

const createClipboardListener = (dispatch: Dispatch<any>, projectUid: string, locationUid: string) => (event: ClipboardEvent) => {
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
    dispatch(uploadImage({
      projectUid,
      locationUid,
      src: imageUrl,
    }));
  }
};

export {
  createClipboardListener,
  createDragdropListener,
};
