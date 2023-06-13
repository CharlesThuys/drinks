import express from 'express';

import users from './users';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'This is the backend for drinking app',
  });
});

router.use('/users', users);

export default router;