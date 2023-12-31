import { Text, Card, Layout, useTheme, Avatar } from '@ui-kitten/components';
import { ImageBackground, StyleSheet, View, Platform } from 'react-native';
import { Event } from '@/types/event';
import * as Haptics from 'expo-haptics';
import { useEvent } from '@/context/eventContext';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { checkPictureUrl } from '@/utils';
import { useAuth } from '@/context/authContext';

const styles = StyleSheet.create({
  card: {
    margin: 0,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    height: 250,
    borderRadius: 6,
  },
  image: {
    ...StyleSheet.absoluteFill as Object,
    height: 250,
  },
  overlay: {
    ...StyleSheet.absoluteFill as Object,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 12,
  },
  text: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

const DEFAULT_BACKGROUND = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.aiysxhOBd9_RKdfjJ9wQYAHaEK%26pid%3DApi&f=1&ipt=c95fc3b5ad0164124cfc48ec7d41aaedc70baf99afe36900f9847781f3db11f7&ipo=images';

const EventCard = ({ event, callBackLongPress }: { event: Event, callBackLongPress?: () => void }) => {
  const theme = useTheme();
  const { setEvent } = useEvent();
  const navigation = useNavigation();
  const { user } = useAuth();

  const [validImage, setValidImage] = useState<boolean>(false);
  const [validAvatar, setValidAvatar] = useState<boolean>(false);


  const dateObject = new Date(event.date);

  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1; // Months are zero-based, so we add 1
  const day = dateObject.getDate();

  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const seconds = dateObject.getSeconds();

  const openEvent = () => {
    if (Platform.OS === 'ios') Haptics.selectionAsync();
    setEvent(event);
    navigation.navigate('Event' as never);
  };

  useEffect(() => {
    checkPictureUrl(event.picture)
      .then(isValidProfilePictureUrl => {
        if (isValidProfilePictureUrl) {
          setValidImage(true);
        } else {
          setValidImage(false);
        }
      });

    checkPictureUrl(event.user.profile_picture)
      .then(isValidProfilePictureUrl => {
        if (isValidProfilePictureUrl) {
          setValidAvatar(true);
        } else {
          setValidAvatar(false);
        }
      });
  }, [event]);

  const showActions = () => {
    if (event.userId !== user?.id) return;
    if (Platform.OS === 'ios') Haptics.selectionAsync();
    callBackLongPress?.();
  };

  return (
    <Card
      style={styles.card}
      onPress={openEvent}
      onLongPress={showActions}
    >
      <ImageBackground source={{ uri: validImage ? event.picture : DEFAULT_BACKGROUND }} resizeMode="cover" style={styles.image}>
        <Layout style={{ ...styles.overlay }}>

          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 10, marginRight: 10, marginTop: 15 }}>
            <View style={{ ...styles.badge, backgroundColor: theme['color-primary-500'] }}>
              <Text style={styles.text}>15 participants</Text>
            </View>
          </View>

          <View style={{ flex: 2 }}>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Text category='h5'>{event.name}</Text>
            </View>
          </View>

          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10, marginBottom: 15 }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
              <Avatar onError={() => { setValidAvatar(false); }} source={{ uri: validAvatar ? event.user.profile_picture : DEFAULT_BACKGROUND }} />
              <Text category='s1'>{event.user.name}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', gap: 4 }}>
              <Text category='s1'>{hours}:{minutes}:{seconds}</Text>
              <Text category='s1'>{day}/{month}/{year}</Text>
            </View>
          </View>

        </Layout>
      </ImageBackground>
    </Card>
  );
};


export default EventCard;