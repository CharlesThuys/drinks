import GameCard from '@/components/gameCard';
import { useAuth } from '@/context/authContext';
import { fetcher } from '@/utils/fetcher';
import { Avatar, BottomNavigation, BottomNavigationTab, Button, Card, Layout, Modal, Text } from '@ui-kitten/components/ui';
import { useEffect, useState } from 'react';
import { FlatList, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Game } from '@/types/game';
import { Event } from '@/types/event';
import EventCard from '@/components/eventCard';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { checkPictureUrl } from '@/utils';

const DEFAULT_BACKGROUND = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.aiysxhOBd9_RKdfjJ9wQYAHaEK%26pid%3DApi&f=1&ipt=c95fc3b5ad0164124cfc48ec7d41aaedc70baf99afe36900f9847781f3db11f7&ipo=images';


const styles = StyleSheet.create({
  textInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textGray: {
    color: 'gray',
    fontSize: 14,
  },
  modal: {
   
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  backdrop: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

const Profile = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const navigation = useNavigation();

  const [games, setGames] = useState<Game[] | null>(null);
  const [events, setEvents] = useState<Event[] | null>();
  const [validAvatar, setValidAvatar] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>();
  const [selectedGameId, setSelectedGameId] = useState<string | null>();

  const navigateBack = () => {
    navigation.goBack();
    if (Platform.OS === 'ios') Haptics.selectionAsync();
  };

  const deleteEventGame = async () => {
    try {
      if (selectedEventId) {
        await fetcher(`events/${selectedEventId}`, 'delete');
        if (events)
          setEvents(events.filter(event => event.id !== selectedEventId));
        setVisible(false);
        setSelectedEventId(null);
      }

      if (selectedGameId) {
        await fetcher(`games/${selectedGameId}`, 'delete');
        if (games)
          setGames(games.filter(game => game.id !== selectedGameId));
        setVisible(false);
        setSelectedGameId(null);
      }
      
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getAllGames = async () => {
      try { 
        const res = await fetcher('games/user', 'get');
        setGames(res.games);
      } catch (err) {
        console.log(err);
      }
    };

    const getAllEvents = async () => {
      try { 
        const res = await fetcher('events/user', 'get');
        setEvents(res.events);
      } catch (err) {
        console.log(err);
      }
    };

    getAllGames();
    getAllEvents();
  }, []);

  useEffect(() => {
    if (!user) return;
    checkPictureUrl(user.profile_picture)
      .then(isValidProfilePictureUrl => {
        if (isValidProfilePictureUrl) {
          setValidAvatar(true);
        } else {
          setValidAvatar(false);
        }
      });
  }, [user]);

  return (
    <Layout style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#0d0e19' }}>

      <View>
        <TouchableOpacity onPress={navigateBack}>
          <Ionicons name="chevron-back" size={32} color={theme['color-primary-500']} onPress={navigateBack}/>
        </TouchableOpacity>
      </View>

      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center', width: '100%', marginBottom: 15 }}>
        <View style={{ display: 'flex', gap: 10 }}>
          <Avatar style={{ width: 100, height: 100, borderColor: 'white', borderWidth: 1 }} onError={() => { setValidAvatar(false); }} source={{ uri: validAvatar ? user?.profile_picture : DEFAULT_BACKGROUND }} />
          <Text style={{ textAlign: 'center' }} category='h5'>{'@' + user?.name}</Text>
        </View>
      </View>

      <View style={{ display: 'flex', flexDirection: 'row',  justifyContent: 'space-around', gap: 10, borderWidth: 1, borderColor: 'gray', borderRadius: 8, paddingVertical: 10, marginBottom: 15, marginHorizontal: 15 }}>
        <View style={styles.textInfo}>
          <Text>{events?.length}</Text>
          <Text style={styles.textGray}>Events</Text>
        </View>

        <View style={styles.textInfo}>
          <Text>{games?.length}</Text>
          <Text style={styles.textGray}>Games</Text>
        </View>
      </View>

      <View style={{ paddingVertical: 15, marginHorizontal: 15 }}>
        <BottomNavigation
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}
        style={{ backgroundColor: 'transparent'  }}
        >
          <BottomNavigationTab title='Events'/>
          <BottomNavigationTab title='Games' />
        </BottomNavigation>
      </View>
     
      <View style={{ display: 'flex', flexDirection: 'column', gap: 10, height: '50%' }}>
        {
          selectedIndex === 0 ? (
            <>
              <Text category='h5' style={{ marginLeft: 15 }}>{events && events?.length > 0 ? 'Your events' : "You don't have any events"}</Text>
              <FlatList
              data={events}
              renderItem={({ item }) => (
                <EventCard
                  event={item}
                  callBackLongPress={() => {
                    setVisible(true);
                    setSelectedEventId(item.id);
                  }}
                />
              )}
              />
            </>
          ) :
            (
            <>
              <Text category='h5' style={{ marginLeft: 15 }}>{games && games?.length > 0 ? 'Your games' : "You don't have any games"}</Text>
              <FlatList
              data={games}
              renderItem={({ item }) => (
                <GameCard
                  game={item}
                  callBackLongPress={() => {
                    setVisible(true);
                    setSelectedGameId(item.id);
                  }}
                />
              )}
              />
            </>
            )
        }
      </View>

      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
        style={styles.modal}
      >
        <Card disabled={true} style={{ backgroundColor: '#0d0e19', width: '100%', borderWidth: 1, borderColor: '#181929' }}>
          <Button onPress={deleteEventGame} style={{ marginBottom: 15, width: '100%' }}>
            Delete
          </Button>
          <Button appearance='outline' onPress={() => setVisible(false)} >
            Cancel
          </Button>
        </Card>
      </Modal>
    </Layout>
  );
};

export default Profile;