import { Text, Card, Layout, useTheme, Button, Avatar } from '@ui-kitten/components';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Event } from '@/types/event';
import { AntDesign } from '@expo/vector-icons'; 

const styles = StyleSheet.create({
  card: {
    margin: 10,
    width: '100%',
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
  button: {
    borderRadius: 100,
  },
});

const DEFAULT_BACKGROUND = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.aiysxhOBd9_RKdfjJ9wQYAHaEK%26pid%3DApi&f=1&ipt=c95fc3b5ad0164124cfc48ec7d41aaedc70baf99afe36900f9847781f3db11f7&ipo=images';

const EventCard = ({ event } : { event: Event }) => {
  const theme = useTheme();

  const dateObject = new Date(event.date);
  
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1; // Months are zero-based, so we add 1
  const day = dateObject.getDate();
  
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const seconds = dateObject.getSeconds();

  return (
    <Card
      style={styles.card}
    >
      <ImageBackground source={{ uri: event.picture ? event.picture : DEFAULT_BACKGROUND }} resizeMode="cover" style={styles.image}>
        <Layout style={{ ...styles.overlay }}>
          
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 10, marginRight: 20, marginTop: 15 }}>
            <View style={{ ...styles.badge, backgroundColor: theme['color-primary-500'] }}>
              <Text style={styles.text}>15 participants</Text>
            </View>
            <Button style={styles.button} children={() => {return <AntDesign name="hearto" size={18} color="white" />;}}/>
          </View>

          <View style={{ flex: 2 }}>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Text>{event.name}</Text>
            </View>
          </View>
          
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 20, marginBottom: 15 }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
              <Avatar  source={{ uri: DEFAULT_BACKGROUND }} />
              <Text>{event.userId}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', gap: 4 }}>
              <Text>{hours}:{minutes}:{seconds}</Text>
              <Text>{day}/{month}/{year}</Text>
            </View>
          </View>

        </Layout>
	    </ImageBackground>
    </Card>
  );
};


export default EventCard;