export type Game = {
  id: string;
  name: string;
  description: string;
  funFactor: number;
  drinkFactor: number;
  userId?: string;
  materials: string[];
  likes?: UserLikesGame[];
};

type UserLikesGame = {
  liked: boolean;
  userId: string;
};

export type GameContextType = {
  game: Game | null;
  setGame: (game: Game) => void;
  games: Game[] | null;
  setGames: (games: Game[] | null) => void;
  getAllGames: () => Promise<void>;
  loading: boolean;
};

