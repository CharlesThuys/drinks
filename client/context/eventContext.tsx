import { ReactElement, createContext, useContext, useState } from 'react';
import { EventContextType, Event } from '@/types/event';
import { fetcher } from '@/utils/fetcher';

const initialEventContextState: EventContextType = {
  event: null,
  setEvent: () => {},
  events: null,
  setEvents: () => {},
  loadingEvents: true,
  loadingAttendingEvents: true,
  setLoadingEvents: () => {},
  setLoadingAttendingEvents: () => {},
  getAllEvents: async () => {},
  getAttendingEvents: async () => {},
  attendingEvents: null,
  setAttendingEvents: () => {},
};

export const EventContext = createContext<EventContextType>(initialEventContextState);

export function useEvent() {
  return useContext(EventContext);
}

const EventProvider = ({ children }: { children: ReactElement }) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[] | null>(null);
  const [attendingEvents, setAttendingEvents] = useState<Event[] | null>(null);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingAttendingEvents, setLoadingAttendingEvents] = useState(true);


  const getAllEvents = async () => {
    try { 
      const res = await fetcher('events', 'get');
      setEvents(res.events);
      setLoadingEvents(false);
    } catch (err) {
      console.log(err);
      setLoadingEvents(false);
    }
  };

  const getAttendingEvents = async () => {
    try {
      const res = await fetcher('events/attending', 'get');
      setAttendingEvents(res.events);
      setLoadingAttendingEvents(false);
    } catch (err) {
      console.log(err);
      setLoadingAttendingEvents(false);
    }
  };

  return (
    <EventContext.Provider
      value={{ 
        setEvent, 
        event,
        events,
        setEvents,
        getAllEvents,
        loadingEvents,
        loadingAttendingEvents,
        setLoadingEvents,
        setLoadingAttendingEvents,
        getAttendingEvents,
        attendingEvents,
        setAttendingEvents,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;