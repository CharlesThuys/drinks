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

export type EventContextType = {
  event: Event | null;
  setEvent: (event: Event) => void;
};