import express from 'express';
import {
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  getUserEvents,
  acceptPublicEvent,
  getAttendingEvents,
} from '../services/events';
import { Event, Invitation, User } from '@prisma/client';
import { getUserFromHeader } from '../services/users';

const router = express.Router();

router.get('/', async (req, res) => {
  const events: Event[] = await getAllEvents();

  res.json({
    events,
  });
});

router.get('/user', async (req, res) => {
  const user: User | null = await getUserFromHeader(
    req.headers.authorization as string,
  );
  if (!user) {
    return res
      .status(401)
      .json({ message: 'You are not authorized' });
  }

  const events: Event[] = await getUserEvents(user.id);

  res.json({
    events,
  });
});

router.get('/attending', async (req, res) => {
  const user: User | null = await getUserFromHeader(
    req.headers.authorization as string,
  );
  if (!user) {
    return res
      .status(401)
      .json({ message: 'You are not authorized' });
  }

  const events: Event[] = await getAttendingEvents(user.id);

  res.json({
    events,
  });
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const event: Event | null = await getEvent(id);
    res.json({
      event,
    });
  } catch (error: any) {
    res.json({
      message: error.message,
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const event: Event = req.body;
    const user: User | null = await getUserFromHeader(
      req.headers.authorization as string,
    );
    event.userId = user!.id;
    const newEvent: Event = await createEvent(event);

    res.json({
      newEvent,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const event: Event = req.body;
    const user: User | null = await getUserFromHeader(
      req.headers.authorization as string,
    );
    const eventToUpdate: Event | null = await getEvent(id);
    if (user?.id !== eventToUpdate?.userId) {
      res
        .status(401)
        .json({ message: 'You are not authorized to update this game' });
    } else {
      const updatedEvent: Event = await updateEvent(id, event);

      res.json({
        updatedEvent,
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
    const user: User | null = await getUserFromHeader(
      req.headers.authorization as string,
    );
    const eventToDelete: Event | null = await getEvent(id);
    if (user?.id !== eventToDelete?.userId) {
      res
        .status(401)
        .json({ message: 'You are not authorized to update this game' });
    } else {
      const deletedEvent: Event = await deleteEvent(id);

      res.json({
        deletedEvent,
      });
    }
  } catch (error: any) {
    res.json({
      message: error.message,
    });
  }
});

router.post('/:id/invitation', async (req, res) => {
  try {
    const id = req.params.id;
    const event: any = await getEvent(id);

    const user: User | null = await getUserFromHeader(
      req.headers.authorization as string,
    );
    
    if (!user) {
      return res
        .status(401)
        .json({ message: 'You are not authorized' });
    }
  
    const invitations: Invitation[] = event.Invitations;
    const invited = invitations.some((invitation) => invitation.userId === user.id);

    if (!event?.pulic && !invited) { 
      return res.json({
        message: 'You are not invited to this event',
      });
    }

    const updatedEvent: Boolean = await acceptPublicEvent(user.id, id);

    res.json({
      updatedEvent,
    });
  } catch (error: any) {
    res.json({
      message: error.message,
    });
  }
});

export default router;
