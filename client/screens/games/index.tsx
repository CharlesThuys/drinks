import GameCard from '@/components/gameCard';
import { GameSkeleton } from '@/components/skeleton';
import { Game } from '@/types/game';
import { fetcher } from '@/utils/fetcher';
import { Layout, Text } from '@ui-kitten/components';
import { useEffect, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';

const Games = () => {
  const [games, setGames] = useState<Game[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState(false);


  const refresh = () => {
    setRefreshing(true);
    setGames(null);
  };

  useEffect(() => {
    const getAllEvents = async () => {
      const data = await fetcher('games', 'get');
      setGames(data.games);
      setLoading(false);
      setRefreshing(false);
    };

    getAllEvents();
  }, [refreshing]);

  return (
    <Layout style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', backgroundColor: '#0d0e19' }}>
      <View style={{ marginLeft: 15, marginBottom: 15, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Text category='h5'>Games</Text>
        <View style={{ backgroundColor: '#21242a', width: 30, height: 30, borderRadius: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 15 }}>{games?.length || 0}</Text>
        </View>
      </View>

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
        keyExtractor={(item) => item.id}refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor='white'/>
        }
      />
  </Layout>
  );
};

export default Games;