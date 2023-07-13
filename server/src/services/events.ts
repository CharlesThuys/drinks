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

export const getUserEvents = async (userId: string): Promise<Event[]> => {
  return prisma.event.findMany({
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
      Invitations: true,
    },
  });
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
      Invitations: true,
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

export const acceptPublicEvent = async (userId: string, givenEventId: string): Promise<Boolean> => {

  const invitation = await prisma.invitation.findFirst({
    where: {
      eventId: givenEventId,
      userId,
    },
  });
  
  if (!invitation) {
    await prisma.invitation.create({
      data: {
        userId,
        eventId: givenEventId,
        accepted: true,
      },
    });
    return true;
  } else {
    await prisma.invitation.delete({
      where: {
        id: invitation.id,
      },
    });

    return false;
  }
 
};
