import express from 'express';
import {
  getAllGames,
  getGame,
  createGame,
  updateGame,
  deleteGame,
} from '../services/games';
import { Game, User } from '@prisma/client';
import { getUserFromHeader } from '../services/users';

const router = express.Router();

router.get('/', async (req, res) => {
  const games: Game[] = await getAllGames();

  res.json({
    games,
  });
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const game: Game | null = await getGame(id);
    res.json({
      game,
    });
  } catch (error: any) {
    res.json({
      message: error.message,
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const game: Game = req.body;
    const user: User | null = await getUserFromHeader(
      req.headers.authorization as string,
    );
    game.userId = user!.id;
    const newGame: Game = await createGame(game);

    res.json({
      newGame,
    });
  } catch (error: any) {
    res.json({
      message: error.message,
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const game: Game = req.body;
    const user: User | null = await getUserFromHeader(
      req.headers.authorization as string,
    );
    const gameToUpdate: Game | null = await getGame(id);
    if (user?.id !== gameToUpdate?.userId) {
      res
        .status(401)
        .json({ message: 'You are not authorized to update this game' });
    } else {
      const updatedGame: Game = await updateGame(id, game);

      res.json({
        updatedGame,
      });
    }
  } catch (error: any) {
    res.json({
      message: error.message,
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const gameToDelete: Game | null = await getGame(id);
    const user: User | null = await getUserFromHeader(
      req.headers.authorization as string,
    );
    if (user?.id !== gameToDelete?.userId) {
      res
        .status(401)
        .json({ message: 'You are not authorized to delete this game' });
    } else {
      const deletedGame: Game = await deleteGame(id);
      res.json({
        deletedGame,
      });
    }
  } catch (error: any) {
    res.json({
      message: error.message,
    });
  }
});

export default router;
