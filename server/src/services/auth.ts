import { prisma } from '../../prisma/prisma';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (user: User) => {
  const foundUser = await prisma.user.findUniqueOrThrow({
    where: {
      name: user.name,
    },
  });

  const isPasswordCorrect = await bcrypt.compareSync(
    user.password,
    foundUser.password,
  );
  if (!isPasswordCorrect) throw new Error('Wrong credentials');

  const token = jwt.sign(
    { id: foundUser.id?.toString(), name: foundUser.name },
    process.env.JWT_SECRET as string,
    {
      expiresIn: '2 days',
    },
  );

  return { user: foundUser, token: token };
};

export const register = async (user: User) => {
  user.password = await bcrypt.hash(user.password, 10);

  const foundUser = await prisma.user.findUnique({
    where: {
      name: user.name,
    },
  });
  if (foundUser) throw new Error('User already exists');

  try {
    const newUser = await prisma.user.create({
      data: user,
    });

    const token = jwt.sign(
      { id: newUser.id?.toString(), name: newUser.name },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '2 days',
      },
    );

    return { user: newUser, token: token };
  } catch (error) {
    throw error;
  }
};
