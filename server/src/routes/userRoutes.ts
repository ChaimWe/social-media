import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import follow from '../controllers/user/follow';
import getProfile from '../controllers/user/userProfile';
import getMe from '../controllers/user/getMe';
import searchUser from '../controllers/user/searchUser';

const userRoutes = express.Router();

userRoutes.get("/search", authenticateToken, searchUser)

userRoutes.post("/:userId/follow", authenticateToken, follow);

userRoutes.get("/:userId", getProfile);

export default userRoutes;