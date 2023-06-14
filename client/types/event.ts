import { User } from './user';

export type Event = {
  id: string;
  name: string;
  picture: string;
  description: string;
  user: User
  date: Date;
  userId: string;
};