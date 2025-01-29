import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './src/lib/connectDB.js';
import {router as authRoutes} from './src/routes/auth.routes.js';
import {router as messageRoutes} from './src/routes/message.routes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
