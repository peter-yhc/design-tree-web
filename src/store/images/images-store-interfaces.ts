export interface ImageInfo {
  src: string;
  uid: string;
  addedDate: string;
  comment?: string;
  metadata?: {
    favourite: boolean;
  }
}
