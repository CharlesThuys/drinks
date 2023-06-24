import { prisma } from '../../prisma/prisma';
import { Event } from '@prisma/client';

export const getAllEvents = async (): Promise<Event[]> => {
  return prisma.event.findMany(
    {
      include: {
        user: {
          select: {
            name: true,
            profile_picture: true,
          },
        },
      },
    },
  );
};

export const getEvent = async (id: string): Promise<Event | null> => {
  return prisma.event.findUnique({
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

export const createEvent = async (event: Event): Promise<Event> => {
  return prisma.event.create({
    data: event,
  });
};

export const updateEvent = async (id: string, event: Event): Promise<Event> => {
  return prisma.event.update({
    where: {
      id,
    },
    data: event,
  });
};

export const deleteEvent = async (id: string): Promise<Event> => {
  return prisma.event.delete({
    where: {
      id,
    },
  });
};