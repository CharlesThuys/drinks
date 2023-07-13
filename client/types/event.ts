import { User } from './user';

type Invitation = {
  id: string;
  eventId: string;
  userId: string;
  accepted: boolean;
};

export type Event = {
  id: string;
  name: string;
  picture: string;
  description: string;
  user: User
  date: Date;
  userId: string;
  Invitations: Invitation[];
};

export type EventContextType = {
  event: Event | null;
  setEvent: (event: Event | null) => void;
  events: Event[] | null;
  setEvents: (events: Event[] | null) => void;
  getAllEvents: () => Promise<void>;
  loadingEvents: boolean;
  loadingAttendingEvents: boolean;  
  setLoadingEvents: (loading: boolean) => void;
  setLoadingAttendingEvents: (loading: boolean) => void;
  getAttendingEvents: () => Promise<void>;
  attendingEvents: Event[] | null;
  setAttendingEvents: (events: Event[] | null) => void;
};