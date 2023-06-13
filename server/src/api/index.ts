import express from 'express';

import users from './users';
import events from './events';
import games from './games';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'This is the backend for drinking app',
  });
});

router.use('/users', users);
router.use('/events', events);
router.use('/games', games);

export default router;