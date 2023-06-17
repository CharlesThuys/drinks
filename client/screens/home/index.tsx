import { Layout, Text } from '@ui-kitten/components';
import { fetcher } from '@/utils/fetcher';
import { useState, useEffect } from 'react';
import { Event } from '@/types/event';
import EventCard from '@/components/eventCard';
import { FlatList, RefreshControl, View } from 'react-native';
import { EventSkeleton } from '@/components/skeleton';


const Home = () => {
  const [events, setEvents] = useState<Event[] | null >();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);


  const refresh = () => {
    setRefreshing(true);
    setEvents(null);
  };

  useEffect(() => {
    const getAllUsers = async () => {
      const data = await fetcher('events', 'get');
      setEvents(data.events);
      setLoading(false);
      setRefreshing(false);
    };

    getAllUsers();
  }, [refreshing]);

  return (
    <Layout style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', backgroundColor: '#0d0e19' }}>
      {loading && 
        <FlatList
        data={[0, 1, 2]}
        renderItem={() => (
          <EventSkeleton />
        )}
      />}
      <View style={{ marginLeft: 15, marginBottom: 15, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Text category='h5'>Events</Text>
        <View style={{ backgroundColor: '#21242a', width: 30, height: 30, borderRadius: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 15 }}>{events?.length || 0}</Text>
        </View>
      </View>
      <FlatList
        data={events}
        renderItem={({ item }) => (
          <EventCard
            event={item}
          />
        )}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor='white'/>
        }
      />
    </Layout>
  );
};

export default Home;