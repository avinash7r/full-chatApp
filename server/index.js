import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './src/lib/connectDB.js';
import {router as authRoutes} from './src/routes/auth.routes.js';
import {router as messageRoutes} from './src/routes/message.routes.js';
import { app, io, server } from './src/lib/socket.js';
import cors from 'cors';

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
