import dotenv from 'dotenv';
import { Server } from './server';

// Configure environment variables first
dotenv.config();

// Create and start the server
const server = new Server();
server.listen();