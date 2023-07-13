import { ReactElement, createContext, useContext, useState } from 'react';
import { GameContextType, Game } from '@/types/game';
import { fetcher } from '@/utils/fetcher';

const initialEventContextState: GameContextType = {
  game: null, 
  setGame: () => {},
  games: null,
  setGames: () => {},
  loadingGames: true,
  setLoadingGames: () => {},
  getAllGames: async () => {},
};

export const GameContext = createContext<GameContextType>(initialEventContextState);

export function useGame() {
  return useContext(GameContext);
}

const GameProvider = ({ children }: { children: ReactElement }) => {
  const [game, setGame] = useState<Game | null>(null);
  const [games, setGames] = useState<Game[] | null>(null);
  const [loadingGames, setLoadingGames] = useState(true);

  const getAllGames = async () => {
    try { 
      const res = await fetcher('games', 'get');
      setGames(res.games);
      setLoadingGames(false);
    } catch (err) {
      console.log(err);
      setLoadingGames(false);
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
        loadingGames,
        setLoadingGames,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;