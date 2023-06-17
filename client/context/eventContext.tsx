import { ReactElement, createContext, useContext, useState } from 'react';
import { EventContextType, Event } from '@/types/event';

export const EventContext = createContext<EventContextType>({ event: null, setEvent: () => {} });

export function useEvent() {
  return useContext(EventContext);
}

const EventProvider = ({ children }: { children: ReactElement }) => {
  const [event, setEvent] = useState<Event | null>(null);

  return (
    <EventContext.Provider
      value={{ 
        setEvent, 
        event,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;