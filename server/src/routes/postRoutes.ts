import express from 'express';
import creatPost  from '../controllers/posts/createPost';
import addComment  from '../controllers/posts/addComment';
import { authenticateToken } from '../middleware/authMiddleware';
import getFeed from '../controllers/posts/getFeed';
import getPost from '../controllers/posts/getPost';
import likePost from '../controllers/posts/likePost';
import deletePost from '../controllers/posts/deletePost';
import { upload } from '../middleware/multerMiddleware';

const postRoutes = express.Router();

postRoutes.post("/", authenticateToken, upload.single("image"), creatPost);

postRoutes.get("/feed", authenticateToken, getFeed);

postRoutes.get("/:postId", getPost);

postRoutes.post("/:postId/comment", authenticateToken, addComment);

postRoutes.post("/:postId/like", authenticateToken, likePost);

postRoutes.delete("/:postId", authenticateToken, deletePost)

export default postRoutes;