import { Layout, Text } from '@ui-kitten/components';
import { fetcher } from "../../utils/fetcher";
import { useState, useEffect } from "react";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
      const getAllEvents = async () => {
          const data = await fetcher("events", "get");
          setEvents(data.events);
      };
  
      getAllEvents();
    }, []);

  return (
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {events ? events.map((event) => (
              <Text key={event.id}>{event.name}</Text>
          )) : 'No events'}
      </Layout>
  )
}

export default Events