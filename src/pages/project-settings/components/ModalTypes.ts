// eslint-disable-next-line no-shadow
export enum FolderType {
  Focus,
  Collection
}

export interface EditModalTargetType {
  name: string;
  puid: string;
  cuid: string;
  fuid?: string;
}

export interface DeleteModalTargetType {
  name: string;
  puid: string;
  cuid: string;
  fuid?: string;
}
