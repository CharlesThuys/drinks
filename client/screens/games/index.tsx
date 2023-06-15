import GameCard from '@/components/gameCard';
import { Game } from '@/types/game';
import { fetcher } from '@/utils/fetcher';
import { Layout, Text } from '@ui-kitten/components';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';

const Games = () => {
  const [games, setGames] = useState<Game[] | null>([]);

  useEffect(() => {
    const getAllEvents = async () => {
      const data = await fetcher('games', 'get');
      setGames(data.games);
    };

    getAllEvents();
  }, []);
  return (
    <Layout style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', backgroundColor: '#0d0e19' }}>
      <ScrollView>
        {games ? games.map((game, index) => <GameCard game={game} key={index}/>) : <Text>No games</Text>}
      </ScrollView>
  </Layout>
  );
};

export default Games;