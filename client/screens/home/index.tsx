import { Layout, Text } from '@ui-kitten/components';
import { fetcher } from '@/utils/fetcher';
import { useState, useEffect } from 'react';
import { Event } from '@/types/event';
import EventCard from '@/components/eventCard';
import { FlatList, RefreshControl, View } from 'react-native';
import { EventSkeleton } from '@/components/skeleton';
import { useHeader } from '@/context/headerContext';
import { useNavigationState } from '@react-navigation/native';


const Home = () => {
  const { setContent } = useHeader();
  const routeObject = useNavigationState((state) => state);

  const [events, setEvents] = useState<Event[] | null >();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);


  const refresh = () => {
    setRefreshing(true);
    setEvents(null);
  };

  const setHeader = () => {
    const routeName = routeObject.routeNames[routeObject.index];

    const content =  (
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Text category='h5'>Events</Text>
        <View style={{ backgroundColor: '#21242a', width: 30, height: 30, borderRadius: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 15 }}>{events?.length || 0}</Text>
        </View>
      </View>
    );

    if (routeName === 'Home') setContent(content);
  };

  useEffect(() => {
    const getAllUsers = async () => {
      try { 
        const res = await fetcher('events', 'get');
        setEvents(res.events);
        setLoading(false);
        setRefreshing(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        setRefreshing(false);
      }
    };

    getAllUsers();
  }, [refreshing]);

  useEffect(() => {
    setHeader();
  }, [routeObject, events]);

  return (
    <Layout style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', backgroundColor: '#0d0e19' }}>
      {loading && 
        <FlatList
        data={[0, 1, 2]}
        renderItem={() => (
          <EventSkeleton />
        )}
      />}

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