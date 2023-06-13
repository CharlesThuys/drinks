import express from 'express';
import { getAllUsers, getUser, createUser, updateUser, deleteUser } from '../services/users';
import { User } from '@prisma/client';

const router = express.Router();


router.get('/', async (req, res) => {
  const users: User[] = await getAllUsers();

  res.json({
    users,
  });
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user: User | null = await getUser(id);
    res.json({
      user,
    });
  } catch (error: any) {
    res.json({
      message: error.message,
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const user: User = req.body;
    const newUser: User = await createUser(user);
  
    res.json({
      newUser,
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
    const user: User = req.body;
    const updatedUser: User = await updateUser(id, user);

    res.json({
      updatedUser,
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
    const deletedUser: User = await deleteUser(id);
    
    res.json({
      deletedUser,
    });
  } catch (error: any) {
    res.json({
      message: error.message,
    });
  }
});


export default router;
