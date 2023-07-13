import { Layout, Text } from '@ui-kitten/components';
import { useState, useEffect } from 'react';
import EventCard from '@/components/eventCard';
import { FlatList, RefreshControl, View } from 'react-native';
import { EventSkeleton } from '@/components/skeleton';
import { useHeader } from '@/context/headerContext';
import { useNavigationState } from '@react-navigation/native';
import { useEvent } from '@/context/eventContext';


const Home = () => {
  const { setContent } = useHeader();
  const routeObject = useNavigationState((state) => state);
  const { setEvents, events, getAllEvents, loadingEvents } = useEvent();

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
    getAllEvents()
      .then(() => {
        setRefreshing(false);
      });
  }, [refreshing]);

  useEffect(() => {
    setHeader();
  }, [routeObject, events]);

  return (
    <Layout style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', backgroundColor: '#0d0e19' }}>
      {loadingEvents && 
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