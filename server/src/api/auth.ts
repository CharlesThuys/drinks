import express from 'express';
import { User } from '@prisma/client';
import { login, register } from '../services/auth';
import { getErrorMessage } from '../utils';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const user = await login(req.body as User);
    res.json(user);
  } catch (error) {
    res.status(400).json(getErrorMessage(error));
  }
});

router.post('/register', async (req, res) => {
  try {
    const user = await register(req.body as User);
    res.json(user);
  } catch (error) {
    res.status(400).json(getErrorMessage(error));
  }
});

export default router;
