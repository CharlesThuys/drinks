import { Game } from '@/types/game';
import { Text, Card, useTheme } from '@ui-kitten/components';
import { StyleSheet, View, Platform } from 'react-native';
import { Octicons, MaterialIcons  } from '@expo/vector-icons'; 
import * as Haptics from 'expo-haptics';
import { useNavigation } from '@react-navigation/native';
import { useGame } from '@/context/gameContext';
import StarRating from 'react-native-star-rating-widget';
import LikeButton from './likeButton';
import { useState } from 'react';
import { fetcher } from '@/utils/fetcher';
import { useAuth } from '@/context/authContext';

const styles = StyleSheet.create({
  card: {
    margin: 0,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    borderRadius: 6,
    backgroundColor: '#191b2b',
  },
});

const GameCard = ({ game } : { game :Game }) => {

  const theme = useTheme();
  const { bearerToken } = useAuth();
  const { setGame } = useGame();
  const navigation = useNavigation();
  const [liked, setLiked] = useState( game.likes.length > 0);
  
  const openGame = () => {
    if (Platform.OS === 'ios') Haptics.selectionAsync();
    navigation.navigate('Game' as never);
    setGame(game);
  };

  const likeEvent = async () => {
    const like = await fetcher(`games/${game.id}/like`, 'post', bearerToken);
    setLiked(like);

    if (Platform.OS === 'ios') Haptics.selectionAsync();
  };
  
  return (
    <Card style={styles.card} onPress={openGame}>
      <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', gap: 5 }}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text category='h5' style={{ fontWeight: '200' }}>{game.name}</Text>
          <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
            <Text category='h6' style={{ fontWeight: '200' }}>56</Text>
            <LikeButton liked={liked} onLike={likeEvent} />
          </View>
        </View>
        <View style={{ gap: 10 }}>
          <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
            <Octicons name="smiley" size={18} color="white" />
            <StarRating rating={game.funFactor} onChange={() => undefined} animationConfig={{ scale: 1 }}/>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
            <MaterialIcons name="local-drink" size={18} color="white" />
            <StarRating rating={game.drinkFactor} onChange={() => undefined} animationConfig={{ scale: 1 }}/>
          </View>
        </View>
      </View>
    </Card>
  );
};

export default GameCard;