import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from "morgan";
import mongodb from './src/config/db-config.js'
import userAuth from './src/route/usersAuth.js'

dotenv.config();
const app = express();
mongodb()

// Middleware
app.use(morgan('combined'));
app.use(express.json());
app.use(cors());

// API routes
app.use('/api', userAuth);

app.listen(process.env.PORT, () => {
    console.log(`server connected to ${process.env.PORT}`);
})