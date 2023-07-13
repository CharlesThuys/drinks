import { Layout, Text } from '@ui-kitten/components';
import { useState, useEffect } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import EventCard from '@/components/eventCard';
import { EventSkeleton } from '@/components/skeleton';
import { useNavigationState } from '@react-navigation/native';
import { useHeader } from '@/context/headerContext';
import { useEvent } from '@/context/eventContext';

const Events = () => {
  const { setContent } = useHeader();
  const routeObject = useNavigationState((state) => state);
  const { setAttendingEvents, attendingEvents, getAttendingEvents, loadingAttending } = useEvent();

  const [refreshing, setRefreshing] = useState(false);

  const refresh = () => {
    setRefreshing(true);
    setAttendingEvents(null);
  };

  const setHeader = () => {
    const routeName = routeObject.routeNames[routeObject.index];

    const content =  (
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Text category='h5'>Attending events</Text>
        <View style={{ backgroundColor: '#21242a', width: 30, height: 30, borderRadius: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 15 }}>{attendingEvents?.length || 0}</Text>
        </View>
      </View>
    );

    if (routeName === 'Events') setContent(content);
  };

  useEffect(() => {
    getAttendingEvents()
      .then(() => {
        setRefreshing(false);
      });
  }, [refreshing]);

  useEffect(() => {
    setHeader();
  }, [routeObject, attendingEvents]);

  return (
    <Layout style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', backgroundColor: '#0d0e19' }}>
      {loadingAttending && 
        <FlatList
        data={[0, 1, 2]}
        renderItem={() => (
          <EventSkeleton />
        )}
      />}

      <FlatList
        data={attendingEvents}
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