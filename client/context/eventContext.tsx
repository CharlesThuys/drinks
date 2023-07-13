import { ReactElement, createContext, useContext, useState } from 'react';
import { EventContextType, Event } from '@/types/event';
import { fetcher } from '@/utils/fetcher';

const initialEventContextState: EventContextType = {
  event: null,
  setEvent: () => {},
  events: null,
  setEvents: () => {},
  loading: true,
  loadingAttending: true,
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
  const [loading, setLoading] = useState(true);
  const [loadingAttending, setLoadingAttending] = useState(true);


  const getAllEvents = async () => {
    try { 
      const res = await fetcher('events', 'get');
      setEvents(res.events);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const getAttendingEvents = async () => {
    try {
      const res = await fetcher('events/attending', 'get');
      setAttendingEvents(res.events);
      setLoadingAttending(false);
    } catch (err) {
      console.log(err);
      setLoadingAttending(false);
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
        loading,
        loadingAttending,
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