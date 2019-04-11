export interface Settings {
  blur: boolean | number; // Migrating from boolean -> number
  darken: boolean | number; // Migrating from boolean -> number
  by: By;
  feed: string;
  timeout: number;
}

export interface Image {
  data: Blob | string;
  image_link: string;
  location_title?: string;
  user_name: string;
  user_link: string;
}

export enum By {
  OFFICIAL = 'official',
  FEED = 'feed',
}
