import { getAuth } from './firebase-api';
import { ICollectionResponse, IFocusResponse, IProjectResponse } from './server-interfaces';

const host = 'http://localhost:8081';

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
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
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
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
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
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });
  return await response.json() as ICollectionResponse;
}

async function createFocus({ name, projectUid, collectionUid }: { name: string, projectUid: string, collectionUid: string}): Promise<IFocusResponse> {
  const token = await getToken();
  const response = await fetch(`${host}/projects/${projectUid}/collections/${collectionUid}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });
  return await response.json() as IFocusResponse;
}

export {
  createProject,
  getProjects,
  createCollection,
  createFocus,
};
