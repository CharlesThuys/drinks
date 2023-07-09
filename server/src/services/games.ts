import { prisma } from '../../prisma/prisma';
import { Game, User } from '@prisma/client';

export const getAllGames = async (): Promise<Game[]> => {
  return prisma.game.findMany({
    include: {
      user: {
        select: {
          name: true,
          profile_picture: true,
        },
      },
      likes: {
        select: {
          liked: true,
          userId: true,
        },
      },
    },
  });
};

export const getUserGames = async (userId: string): Promise<Game[]> => {
  return prisma.game.findMany({
    where: {
      userId,
    },
    include: {
      user: {
        select: {
          name: true,
          profile_picture: true,
        },
      },
      likes: {
        select: {
          liked: true,
          userId: true,
        },
      },
    },
  });
};

export const getGame = async (id: string): Promise<Game | null> => {
  return prisma.game.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          name: true,
          profile_picture: true,
        },
      },
      likes: {
        select: {
          liked: true,
          userId: true,
        },
      },
    },
  });
};

export const createGame = async (game: Game): Promise<Game> => {
  return prisma.game.create({
    data: game,
  });
};

export const updateGame = async (id: string, game: Game): Promise<Game> => {
  return prisma.game.update({
    where: {
      id,
    },
    data: game,
  });
};

export const deleteGame = async (id: string): Promise<Game> => {
  return prisma.game.delete({
    where: {
      id,
    },
  });
};

export const isGameLiked = async (
  gameId: string,
  user: User,
): Promise<Boolean> => {
  const userLikesGame = await prisma.userLikesGame.findFirst({
    where: {
      gameId: gameId,
      userId: user.id,
    },
  });

  if (userLikesGame) return true;
  return false;
};

export const likeGame = async (
  gameId: string,
  user: User,
): Promise<Boolean> => {
  const userLikesGame = await prisma.userLikesGame.findFirst({
    where: {
      gameId: gameId,
      userId: user.id,
    },
  });

  if (userLikesGame) {
    await prisma.userLikesGame.delete({
      where: {
        id: userLikesGame.id,
      },
    });
    return false;
  }

  await prisma.userLikesGame.create({
    data: {
      gameId: gameId,
      userId: user.id,
    },
  });
  return true;
};
