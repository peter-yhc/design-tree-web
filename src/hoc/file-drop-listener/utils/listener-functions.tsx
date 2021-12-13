import { Dispatch } from 'redux';
import React from 'react';
import { uploadImage } from 'store/images/images-store-requests';
import { nanoid } from '@reduxjs/toolkit';

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
            fileName: imageName,
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
  } else if (event?.clipboardData?.items[0]?.kind === 'file') {
    const fileItem = event?.clipboardData?.items[0];
    const reader = new FileReader();
    const file = fileItem.getAsFile();
    reader.onload = (fileEvent) => {
      const dataUrl: string = fileEvent.target?.result as string;
      const [type, dataSrc] = dataUrl.split(';');
      dispatch(uploadImage({
        projectUid, locationUid, src: dataSrc.split(',')[1], fileName: `${nanoid()}.${type.split('/')[1]}`,
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  } else {
    return;
  }

  if (imageUrl) {
    const splitUrl = imageUrl.split('/');
    dispatch(uploadImage({
      projectUid, locationUid, src: imageUrl, fileName: splitUrl[splitUrl.length],
    }));
  }
};

export {
  createClipboardListener,
  createDragdropListener,
};
