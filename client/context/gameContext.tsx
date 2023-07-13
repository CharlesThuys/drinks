import { ReactElement, createContext, useContext, useState } from 'react';
import { GameContextType, Game } from '@/types/game';
import { fetcher } from '@/utils/fetcher';

const initialEventContextState: GameContextType = {
  game: null, 
  setGame: () => {},
  games: null,
  setGames: () => {},
  loading: true,
  getAllGames: async () => {},
};

export const GameContext = createContext<GameContextType>(initialEventContextState);

export function useGame() {
  return useContext(GameContext);
}

const GameProvider = ({ children }: { children: ReactElement }) => {
  const [game, setGame] = useState<Game | null>(null);
  const [games, setGames] = useState<Game[] | null>(null);
  const [loading, setLoading] = useState(true);

  const getAllGames = async () => {
    try { 
      setGames(null);
      const res = await fetcher('games', 'get');
      setGames(res.games);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <GameContext.Provider
      value={{ 
        setGame, 
        game,
        getAllGames,
        games,
        setGames,
        loading,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;