import { prisma } from '../../prisma/prisma';
import { Game } from '@prisma/client';

export const getAllGames = async (): Promise<Game[]> => {
  return prisma.game.findMany({
    include: {
      user: {
        select: {
          name: true,
          profile_picture: true,
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