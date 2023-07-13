import GameCard from '@/components/gameCard';
import { GameSkeleton } from '@/components/skeleton';
import { useGame } from '@/context/gameContext';
import { useHeader } from '@/context/headerContext';
import { useNavigationState } from '@react-navigation/native';
import { Layout, Text } from '@ui-kitten/components';
import { useEffect, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';

const Games = () => {
  const { games, getAllGames, setGames, loading } = useGame();
  const routeObject = useNavigationState((state) => state);
  const { setContent } = useHeader();
  
  const [refreshing, setRefreshing] = useState(false);


  const refresh = () => {
    setRefreshing(true);
    setGames(null);
  };

  const setHeader = () => {
    const routeName = routeObject.routeNames[routeObject.index];

    const content =  (
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Text category='h5'>Games</Text>
        <View style={{ backgroundColor: '#21242a', width: 30, height: 30, borderRadius: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 15 }}>{games?.length || 0}</Text>
        </View>
      </View>
    );

    if (routeName === 'Games') setContent(content);
  };

  useEffect(() => {
    getAllGames()
      .then(() => {
        setRefreshing(false);
      });
  }, [refreshing]);

  useEffect(() => {
    setHeader();
  }, [routeObject, games]);

  return (
    <Layout style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', backgroundColor: '#0d0e19' }}>
       {loading && 
        <FlatList
        data={[0, 1, 2]}
        renderItem={() => (
          <GameSkeleton />
        )}
      />}
      
      <FlatList
        data={games}
        renderItem={({ item }) => (
          <GameCard
            game={item}
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

export default Games;