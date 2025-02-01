import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from "morgan";
import mongodb from './src/config/db-config.js'
import userAuth from './src/route/usersAuth.js'
import chatRoute from './src/route/chatRoute.js'
import http from 'http';
import { server} from 'socket.io'


dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server);
mongodb()



// Middleware
app.use(morgan('combined'));
app.use(express.json());
app.use(cors());

// API routes
app.use('/api', userAuth);
app.use('/api/chat', chatRoute);

server.listen(process.env.PORT, () => {
    console.log(`server connected to ${process.env.PORT}`);
})