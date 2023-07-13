import { useEvent } from '@/context/eventContext';
import { Avatar, Button, Layout, Text, useTheme } from '@ui-kitten/components';
import { Image, StyleSheet, TouchableOpacity, View, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { useEffect, useState } from 'react';
import { checkPictureUrl } from '@/utils';
import { useAuth } from '@/context/authContext';
import { fetcher } from '@/utils/fetcher';

const styles = StyleSheet.create({
  image: {
    height: 250,
    marginTop: 10,
  },
  badge: {
    paddingHorizontal: 18,
    paddingVertical: 5,
    borderRadius: 8,
    borderColor: 'transparent',
  },
  text: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  button: {
    height: 20,
    width: 20,
    borderRadius: 100,
  },
});

const DEFAULT_BACKGROUND = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.aiysxhOBd9_RKdfjJ9wQYAHaEK%26pid%3DApi&f=1&ipt=c95fc3b5ad0164124cfc48ec7d41aaedc70baf99afe36900f9847781f3db11f7&ipo=images';


const Event = ({}) => {
  const theme = useTheme();
  const { event, setEvent, getAllEvents, getAttendingEvents } = useEvent();
  const { user } = useAuth();
  const navigation = useNavigation();

  const [date, setDate] = useState<Date>();
  const [validImage, setValidImage] = useState(false);
  const [validAvatar, setValidAvatar] = useState<boolean>(false);
  const [isGoing, setIsGoing] = useState<boolean>(event?.Invitations.some(invitation => invitation.userId === user?.id) || false);
  
  const navigateBack = () => {
    setEvent(null);

    navigation.goBack();
    if (Platform.OS === 'ios') Haptics.selectionAsync();
  };

  const handleGoing = () => {
    if (Platform.OS === 'ios') Haptics.selectionAsync();
    setIsGoing(!isGoing);
    fetcher(`events/${event?.id}/invitation`, 'post').then(() => {
      getAllEvents();
      getAttendingEvents();
    });
   
  };
 
  useEffect(() => {
    if (event) {
      setIsGoing(event?.Invitations.some(invitation => invitation.userId === user?.id) || false);
      const dateObject = new Date(event.date);
      setDate(dateObject);

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
    }
  }, [event]);

  return (
    event &&
    <Layout style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#0d0e19' }}>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={navigateBack}>
          <Ionicons name="chevron-back" size={32} color={theme['color-primary-500']} onPress={navigateBack}/>
        </TouchableOpacity>

        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text category='h5'>{event.name}</Text>
        </View>
      </View>

      <Image
        onError={() => { setValidImage(false);}}
        style={styles.image}
        source={ { uri: validImage ? event.picture : DEFAULT_BACKGROUND }}
      />

      <View style={{ marginTop: -37 }}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 20, marginRight: 20, marginTop: 15 }}>
          <Button onPress={handleGoing} style={{ ...styles.badge, backgroundColor: isGoing ? 'rgba(11, 24, 117, 0.9)' : theme['color-primary-500'] }} children={() => {
            return (
              <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center', justifyContent: 'center' }}>
                {isGoing ? 
                  <Ionicons name="checkmark-circle-outline" size={24} color={isGoing ? theme['color-primary-300'] : 'white'} />
                  : 
                  <MaterialCommunityIcons name="calendar-question" size={24} color="white" />
                }
                <Text style={{ ...styles.text, color: isGoing ? theme['color-primary-300'] : 'white' }}>Goes</Text>
              </View>
            );
          }}/>
            
        </View>
      </View>

      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5, marginVertical: 20 }}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
          <Avatar onError={() => { setValidAvatar(false); }} source={{ uri: validAvatar ? event.user.profile_picture : DEFAULT_BACKGROUND }} />
          <Text category='s1'>{event.user.name}</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', gap: 4 }}>
          {date && 
            <>
              <Text category='s1'>{date?.getHours()}:{date?.getMinutes()}:{date?.getSeconds()}</Text>
              <Text category='s1'>{date?.getDay()}/{date?.getMonth()}/{date?.getFullYear()}</Text>
            </>
          }
        </View>
      </View>

    </Layout>
  );
};

export default Event;