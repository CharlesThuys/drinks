import { Layout, Text } from '@ui-kitten/components';
import { fetcher } from '@/utils/fetcher';
import { useState, useEffect } from 'react';
import { Event } from '@/types/event';
import { FlatList, RefreshControl, View } from 'react-native';
import EventCard from '@/components/eventCard';
import { EventSkeleton } from '@/components/skeleton';
import { useNavigationState } from '@react-navigation/native';
import { useHeader } from '@/context/headerContext';
import { useAuth } from '@/context/authContext';

const Events = () => {
  const { bearerToken } = useAuth();
  const routeObject = useNavigationState((state) => state);
  const { setContent } = useHeader();

  const [events, setEvents] = useState<Event[] | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState(false);


  const refresh = () => {
    setRefreshing(true);
    setEvents(null);
  };

  const setHeader = () => {
    const routeName = routeObject.routeNames[routeObject.index];

    const content =  (
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Text category='h5'>Attending events</Text>
        <View style={{ backgroundColor: '#21242a', width: 30, height: 30, borderRadius: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 15 }}>{events?.length || 0}</Text>
        </View>
      </View>
    );

    if (routeName === 'Events') setContent(content);
  };

  useEffect(() => {
    const getAllEvents = async () => {
      try { 
        const res = await fetcher('events', 'get', bearerToken);
        setEvents(res.events);
        setLoading(false);
        setRefreshing(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        setRefreshing(false);
      }
    };

    getAllEvents();
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

export default Events;