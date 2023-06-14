import { Layout, Text } from '@ui-kitten/components';
import { fetcher } from '@/utils/fetcher';
import { useState, useEffect } from 'react';
import { Event } from '@/types/event';
import EventCard from '@/components/eventCard';
import { ScrollView } from 'react-native';


const Home = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const data = await fetcher('events', 'get');
      setEvents(data.events);
    };

    getAllUsers();
  }, []);

  return (
    <Layout style={{ width: '100%', display: 'flex', justifyContent: 'center', backgroundColor: '#0d0e19', paddingLeft: 0, paddingRight: 10 }}>
      <ScrollView>
        {events ? events.map((event, index) => <EventCard event={event} key={index}/>) : <Text>No events</Text>}
      </ScrollView>
    </Layout>
  );
};

export default Home;