import { ReactElement, createContext, useContext, useState } from 'react';
import { GameContextType, Game } from '@/types/game';

export const GameContext = createContext<GameContextType>({ game: null, setGame: () => {} });

export function useGame() {
  return useContext(GameContext);
}

const GameProvider = ({ children }: { children: ReactElement }) => {
  const [game, setGame] = useState<Game | null>(null);

  return (
    <GameContext.Provider
      value={{ 
        setGame, 
        game,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;