import express from 'express';
import {
  register,
  getProfile,
  login,
  logOut,
  logOutAll,
  deleteProfile,
  updateProfile,
  OwnerEstates,
  readUsers,
  readSingleUser,
  updateUserProfile,
  deleteUserProfile,
} from '../controllers/UserController.js';
import { Auth } from '../middleware/Auth.js';
import { isAdmin } from '../utils.js';

const userRouter = express.Router();
//********GUEST
userRouter.post('/register', register);
userRouter.post('/login', login);

//********OWNER
userRouter.post('/logout', Auth, logOut);
userRouter.post('/logoutAll', Auth, logOutAll);
userRouter.get('/me', Auth, getProfile); //ownerInfo
userRouter.get('/me/estates', Auth, OwnerEstates); //ownerEstates
userRouter.delete('/me', Auth, deleteProfile);
userRouter.patch('/me', Auth, updateProfile);

//********ADMIN
userRouter.get('/All', Auth, isAdmin, readUsers);
userRouter.patch('/:id', Auth, isAdmin, updateUserProfile);
userRouter.delete('/:id', Auth, isAdmin, deleteUserProfile);

export default userRouter;
