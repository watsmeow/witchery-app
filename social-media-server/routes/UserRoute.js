import express from 'express';
import { deleteUser, followUser, getAllUsers, getUser, unfollowUser, updateUser } from '../controllers/UserController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

//get request, not sending any info using the body of the request because the user ID is in the url of the request
router.get('/:id', getUser)

//get request to get all users
router.get('/', getAllUsers)

//update user in DB
router.put('/:id', authMiddleware, updateUser)

//delete a user
router.delete('/:id', authMiddleware, deleteUser)

//follow another user
router.put('/:id/follow', authMiddleware, followUser)

//follow another user
router.put('/:id/unfollow', authMiddleware, unfollowUser)

export default router;