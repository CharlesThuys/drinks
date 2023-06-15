import { Game } from '@/types/game';
import { Text, Card, useTheme } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { Octicons, MaterialIcons  } from '@expo/vector-icons'; 
import * as Haptics from 'expo-haptics';

const styles = StyleSheet.create({
  card: {
    margin: 0,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    height: 130,
    borderRadius: 6,
    backgroundColor: '#191b2b',
  },
});

const GameCard = ({ game } : { game :Game }) => {
  const theme = useTheme();

  const openGame = () => {
    Haptics.selectionAsync();
  };
  
  return (
    <Card style={styles.card} onPress={openGame}>
      <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', width: '100%' }}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text category='h5' style={{ color: theme['color-primary-500'], fontWeight: 'bold' }}>{game.name}</Text>
          <Text category='label'>people</Text>
        </View>
        <View style={{ gap: 10 }}>
          <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
            <Octicons name="smiley" size={18} color="white" />
            <Text category='s1'>{game.funFactor}</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
            <MaterialIcons name="local-drink" size={18} color="white" />
            <Text category='s1'>{game.drinkFactor}</Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

export default GameCard;