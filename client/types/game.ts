export type Game = {
  id: string;
  name: string;
  description: string;
  funFactor: number;
  drinkFactor: number;
  userId: string;
  materials: string[];
};

export type GameContextType = {
  game: Game | null;
  setGame: (game: Game) => void;
};