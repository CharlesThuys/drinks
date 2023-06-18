import express from 'express';
import {
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../services/events';
import { Event } from '@prisma/client';

const router = express.Router();

router.get('/', async (req, res) => {
  const events: Event[] = await getAllEvents();

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
    const newEvent: Event = await createEvent(event);

    res.json({
      newEvent,
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
    const event: Event = req.body;
    const updatedEvent: Event = await updateEvent(id, event);

    res.json({
      updatedEvent,
    });
  } catch (error: any) {
    res.json({
      message: error.message,
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedEvent: Event = await deleteEvent(id);

    res.json({
      deletedEvent,
    });
  } catch (error: any) {
    res.json({
      message: error.message,
    });
  }
});

export default router;
