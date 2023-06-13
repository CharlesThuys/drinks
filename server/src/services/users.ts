import { prisma } from '../../prisma/prisma';
import { User } from '@prisma/client';

export const getAllUsers = async (): Promise<User[]> => {
  return prisma.user.findMany();
};

export const getUser = async (id: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export const createUser = async (user: User): Promise<User> => {
  return prisma.user.create({
    data: user,
  });
};

export const updateUser = async (id: string, user: User): Promise<User> => {
  return prisma.user.update({
    where: {
      id,
    },
    data: user,
  });
};

export const deleteUser = async (id: string): Promise<User> => {
  return prisma.user.delete({
    where: {
      id,
    },
  });
};