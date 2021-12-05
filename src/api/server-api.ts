import { getAuth } from './firebase-api';
import {
  ICollectionResponse, IFocusResponse, IImageResponse, IProjectResponse,
} from './server-interfaces';

declare let process : {
  env: {
    serverConfig: any;
  }
};

console.log(process.env);
const host = process.env.serverConfig.HOST;

const getToken = async () => {
  const token = await getAuth().currentUser?.getIdToken();
  if (!token) {
    throw new Error('Unauthorised');
  }
  return token;
};

async function createProject({ name }: { name: string }): Promise<IProjectResponse> {
  const token = await getToken();
  const response = await fetch(`${host}/projects`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });
  return await response.json() as IProjectResponse;
}

async function getProjects(): Promise<IProjectResponse[]> {
  const token = await getToken();
  const response = await fetch(`${host}/projects`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
  return await response.json() as IProjectResponse[];
}

async function createCollection({ name, projectUid }: { name: string, projectUid: string}): Promise<ICollectionResponse> {
  const token = await getToken();
  const response = await fetch(`${host}/projects/${projectUid}/collections`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });
  return await response.json() as ICollectionResponse;
}

async function createFocus({ name, projectUid, collectionUid }: { name: string, projectUid: string, collectionUid: string}): Promise<IFocusResponse> {
  const token = await getToken();
  const response = await fetch(`${host}/projects/${projectUid}/collections/${collectionUid}/focuses`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });
  return await response.json() as IFocusResponse;
}

async function getImages({ projectUid, locationUid }: {projectUid: string, locationUid: string}): Promise<IImageResponse[]> {
  const token = await getToken();
  const response = await fetch(`${host}/images/${projectUid}/${locationUid}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
  return await response.json() as IImageResponse[];
}

async function createImage(projectUid: string, locationUid: string, src: string): Promise<IImageResponse> {
  const token = await getToken();
  const response = await fetch(`${host}/images`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ projectUid, locationUid, src }),
  });
  return await response.json() as IImageResponse;
}

async function removeImages(projectUid: string, locationUid: string, imageUids: string[]): Promise<void> {
  const token = await getToken();
  await fetch(`${host}/images/${projectUid}/${locationUid}/delete`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ uids: imageUids }),
  });
}

async function favouriteImage(projectUid: string, locationUid: string, imageUid: string, isFavourite: boolean): Promise<IImageResponse> {
  const token = await getToken();
  const response = await fetch(`${host}/images/${projectUid}/${locationUid}/${imageUid}`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ metadata: { favourite: isFavourite } }),
  });
  return await response.json() as IImageResponse;
}

async function putImageComment(projectUid: string, locationUid: string, imageUid: string, comment: string): Promise<IImageResponse> {
  const token = await getToken();
  const response = await fetch(`${host}/images/${projectUid}/${locationUid}/${imageUid}`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ comment }),
  });
  return await response.json() as IImageResponse;
}

async function removeImageComment(projectUid: string, locationUid: string, imageUid: string): Promise<IImageResponse> {
  const token = await getToken();
  const response = await fetch(`${host}/images/${projectUid}/${locationUid}/${imageUid}/comments`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
  return await response.json() as IImageResponse;
}

export {
  createProject,
  getProjects,
  createCollection,
  createFocus,
  getImages,
  createImage,
  removeImages,
  favouriteImage,
  putImageComment,
  removeImageComment,
};
