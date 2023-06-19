import { prisma } from '../../prisma/prisma';
import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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

export const getUserFromHeader = async (
  header: string,
): Promise<User | null> => {
  const token = header.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as {
    id: string;
    name: string;
  };

  return prisma.user.findUnique({
    where: {
      id: decodedToken.id,
    },
  });
};

export const updateUser = async (id: string, user: User): Promise<User> => {
  user.password = await bcrypt.hash(user.password, 10);
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
