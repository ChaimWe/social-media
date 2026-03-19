import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import follow from '../controllers/user/follow';
import getProfile from '../controllers/user/userProfile';
import searchUser from '../controllers/user/searchUser';
import listUsers from '../controllers/user/listUsers';

const userRoutes = express.Router();

userRoutes.get("/", authenticateToken, listUsers);

userRoutes.get("/search", authenticateToken, searchUser)

userRoutes.post("/:userId/follow", authenticateToken, follow);

userRoutes.get("/:userId", authenticateToken, getProfile);

export default userRoutes;