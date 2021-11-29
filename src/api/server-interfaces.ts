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
