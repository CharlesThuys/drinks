import { Game } from '@/types/game';
import { Text, Card } from '@ui-kitten/components';
import { StyleSheet, View, Platform } from 'react-native';
import { Octicons, MaterialIcons, FontAwesome  } from '@expo/vector-icons'; 
import * as Haptics from 'expo-haptics';
import { useNavigation } from '@react-navigation/native';
import { useGame } from '@/context/gameContext';
import LikeButton from './likeButton';
import { useState } from 'react';
import { fetcher } from '@/utils/fetcher';
import Stars from 'react-native-stars';
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
  const { user } = useAuth();
  const { setGame } = useGame();
  const navigation = useNavigation();
  const [liked, setLiked] = useState<boolean>(() => {
    if (game.likes) {
      return game.likes.some((item) => item.userId === user?.id);
    }
    return false;
  });
  const [likes, setLikes] = useState<number>(game.likes?.length || 0);
  const [liking, setLiking] = useState<boolean>(false);
  
  const openGame = () => {
    if (Platform.OS === 'ios') Haptics.selectionAsync();
    navigation.navigate('Game' as never);
    setGame(game);
  };

  const likeEvent = async () => {
    setLiking(true);
    if (Platform.OS === 'ios') Haptics.selectionAsync();
    setLiked(!liked);

    const updatedLikes = liked ? likes - 1 : likes + 1;
    setLikes(updatedLikes);

    await fetcher(`games/${game.id}/like`, 'post');
    setLiking(false);
  };
  
  return (
    <Card style={styles.card} onPress={openGame}>
      <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', gap: 5 }}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text category='h5' style={{ fontWeight: '200' }}>{game.name}</Text>
          <View style={{ display: 'flex', flexDirection: 'row', gap: 8, alignItems: 'center' }}>
            <Text category='h6' style={{ fontWeight: '200' }}>{likes}</Text>
            <LikeButton liked={liked} onLike={likeEvent} disabled={liking}/>
          </View>
        </View>
        <View style={{ gap: 10 }}>
          <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
            <Octicons name="smiley" size={18} color="white" />
            <Stars
            half={false}
            default={game.funFactor}
            spacing={4}
            count={5}
            disabled={true}
            fullStar={<FontAwesome name="star" size={26} color="yellow" />}
            emptyStar={<FontAwesome name="star-o" size={26} color="yellow" />}
            halfStar={<FontAwesome name="star-half-empty" size={26} color="yellow" />}/>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
            <MaterialIcons name="local-drink" size={18} color="white" />
            <Stars
            half={false}
            default={game.drinkFactor}
            spacing={4}
            count={5}
            disabled={true}
            fullStar={<FontAwesome name="star" size={26} color="yellow" />}
            emptyStar={<FontAwesome name="star-o" size={26} color="yellow" />}
            halfStar={<FontAwesome name="star-half-empty" size={26} color="yellow" />}/>
          </View>
        </View>
      </View>
    </Card>
  );
};

export default GameCard;