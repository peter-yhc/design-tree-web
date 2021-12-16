import { Dispatch } from 'redux';
import React from 'react';
import { uploadImage } from 'store/images/images-store-requests';
import { nanoid } from '@reduxjs/toolkit';
import systemStore from 'store/system/system-store';
import { domains } from './domains';

const fileHandlerUpload = (file: File, dispatch:Dispatch<any>, { projectUid, locationUid }: {projectUid:string, locationUid: string}) => {
  const reader = new FileReader();
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
};

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

        if (imageUrl && imageName && !domains.some((domain) => imageUrl.includes(domain))) {
          dispatch(uploadImage({
            projectUid,
            locationUid,
            src: imageUrl,
            fileName: imageName,
          }));
          successCB();
        } else {
          dispatch(systemStore.actions.showBadImageUrlMessage());
        }
      });
      break;
    } else if (event.dataTransfer.items[i].type.includes('image/')) {
      const file = event.dataTransfer.items[i].getAsFile();
      if (file) {
        fileHandlerUpload(file, dispatch, { projectUid, locationUid });
      }
    }
  }
};

const createClipboardListener = (dispatch: Dispatch<any>, projectUid: string, locationUid: string) => (event: ClipboardEvent) => {
  function processImageUrl(imageUrl: string) {
    if (!domains.some((domain) => imageUrl.includes(domain))) {
      const splitUrl = imageUrl.split('/');
      dispatch(uploadImage({
        projectUid, locationUid, src: imageUrl, fileName: splitUrl[splitUrl.length],
      }));
    } else {
      dispatch(systemStore.actions.showBadImageUrlMessage());
    }
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
    const file = fileItem.getAsFile();
    if (file) {
      fileHandlerUpload(file, dispatch, { projectUid, locationUid });
    }
  }
};

export {
  createClipboardListener,
  createDragdropListener,
};
