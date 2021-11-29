export interface IFocusResponse {
  name: string;
  uid: string;
}

export interface ICollectionResponse {
  name: string;
  uid: string;
  focuses?: IFocusResponse[];
}

export interface IProjectResponse {
  name: string;
  uid: string;
  collections?: ICollectionResponse[]
}

export interface IImageResponse {
  projectUid: string;
  locationUid: string;
  src: string;
  uid: string;
  addedDate: string;
  comment?: string;
  metadata?: {
    favourite: boolean;
  }
}
