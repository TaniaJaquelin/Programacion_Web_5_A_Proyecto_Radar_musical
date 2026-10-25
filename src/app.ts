import dotenv from 'dotenv';
import { Server } from './server';
import routes from './routes/index';
import dbConnection from './conf/dbConnection';

dotenv.config();

const startApp = async (): Promise<void> => {
    try {
        // connect to MongoDB
        await dbConnection.connect();

        // start the Express server
        const server = new Server({
            port: Number(process.env.PORT) || 3000,
            routes: routes
        });
        server.start();
    } catch (error) {
        console.error('Failed to start application:', error);
    }
};

startApp();