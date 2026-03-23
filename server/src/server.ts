import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import authRoutes from './routes/authRoutes';
import errorMiddleware from './middleware/errorMiddleware';
import successMessageMiddleware from './middleware/successMessageMiddleware';

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

app.use(successMessageMiddleware);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
const MongoURI = process.env.MONGO_URI || "";
console.log("MONGO_URI: ", MongoURI)

mongoose.connect(MongoURI)
  .then(() => {
    console.log("MongoDB connected at ", mongoose.connection.name);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });