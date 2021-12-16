import { Dispatch } from 'redux';
import React from 'react';
import { uploadImage } from 'store/images/images-store-requests';
import { nanoid } from '@reduxjs/toolkit';
import systemStore from 'store/system/system-store';

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
        const matches = data.match(/<img(.*)src="(.*?)"/);
        const imageUrl = (matches && matches[2]) || '';
        const imageName = imageUrl?.split('/').pop();

        if (imageUrl && imageName) {
          fetch(imageUrl).then(() => {
            dispatch(uploadImage({
              projectUid,
              locationUid,
              src: imageUrl,
              fileName: imageName,
            }));
            successCB();
          }, () => {
            dispatch(systemStore.actions.showBadImageUrlMessage());
          });
        }
      });
      break;
    }
  }
};

const createClipboardListener = (dispatch: Dispatch<any>, projectUid: string, locationUid: string) => (event: ClipboardEvent) => {
  function processImageUrl(imageUrl: string) {
    return fetch(imageUrl).then(() => {
      const splitUrl = imageUrl.split('/');
      dispatch(uploadImage({
        projectUid, locationUid, src: imageUrl, fileName: splitUrl[splitUrl.length],
      }));
    }, () => {
      dispatch(systemStore.actions.showBadImageUrlMessage());
    });
  }

  if (event?.clipboardData?.getData('text')) {
    const imageUrl = event?.clipboardData?.getData('text') as string;
    processImageUrl(imageUrl);
  } else if (event?.clipboardData?.getData('text/html')) {
    const data = event?.clipboardData?.getData('text/html');
    const matches = data.match(/<img(.*)src="(.*?)"/);
    const imageUrl = (matches && matches[2]) || '';
    processImageUrl(imageUrl);
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
  }
};

export {
  createClipboardListener,
  createDragdropListener,
};
