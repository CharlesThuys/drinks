import { useEvent } from '@/context/eventContext';
import { Avatar, Layout, Text, useTheme } from '@ui-kitten/components';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import LikeButton from '@/components/likeButton';
import { useEffect, useState } from 'react';

const styles = StyleSheet.create({
  image: {
    height: 250,
    marginTop: 10,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 9,
    borderRadius: 12,
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


const Event = () => {
  const theme = useTheme();
  const { event } = useEvent();
  const navigation = useNavigation();

  const [liked, setLiked] = useState(false);
  const [date, setDate] = useState<Date>();

  const navigateBack = () => {
    navigation.goBack();
    Haptics.selectionAsync();
  };

  const likeEvent = () => {
    setLiked(!liked);
    Haptics.selectionAsync();
  };

  

  useEffect(() => {
    if (event) {
      const dateObject = new Date(event.date);
      setDate(dateObject);
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
        style={styles.image}
        source={{ uri: event.picture || DEFAULT_BACKGROUND }}
      />

      <View style={{ marginTop: -37 }}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 20, marginRight: 20, marginTop: 15 }}>
          <View style={{ ...styles.badge, backgroundColor: theme['color-primary-500'] }}>
            <Text style={styles.text}>15 participants</Text>
          </View>
          <LikeButton liked={liked} onLike={likeEvent}/>
        </View>
      </View>

      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5, marginVertical: 20 }}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
          <Avatar source={{ uri: DEFAULT_BACKGROUND }} />
          <Text category='s1'>{event.userId}</Text>
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