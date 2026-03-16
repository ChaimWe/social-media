import express from 'express';
import registerUser from '../controllers/user/register';
import loginUserController from '../controllers/user/login';
import { authenticateToken } from '../middleware/authMiddleware';
import getMe from '../controllers/user/getMe';

const authRoutes = express.Router();

authRoutes.get("/me", authenticateToken, getMe);

authRoutes.post("/register", registerUser);

authRoutes.post("/login", loginUserController);

authRoutes.post("/logout", (_req, res)=>{
    res.clearCookie('token').json({message: "Logged out successfully"});
});

export default authRoutes;