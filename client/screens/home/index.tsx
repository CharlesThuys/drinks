import { Layout } from '@ui-kitten/components';
import { fetcher } from '@/utils/fetcher';
import { useState, useEffect } from 'react';
import { Event } from '@/types/event';
import EventCard from '@/components/eventCard';
import { FlatList } from 'react-native';


const Home = () => {
  const [events, setEvents] = useState<Event[] | null >();

  useEffect(() => {
    const getAllUsers = async () => {
      const data = await fetcher('events', 'get');
      setEvents(data.events);
    };

    getAllUsers();
  }, []);

  return (
    <Layout style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', backgroundColor: '#0d0e19' }}>
     <FlatList
        data={events}
        renderItem={({ item }) => (
          <EventCard
            event={item}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </Layout>
  );
};

export default Home;