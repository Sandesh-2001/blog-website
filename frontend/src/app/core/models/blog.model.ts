export interface Blog {
  title: string;
  author: string;
  shortDesc: string;
  publishDate: Date;
  timeToRead: number;
  coverPhoto: any;
  treanding: boolean;
  tags: [string];
}
