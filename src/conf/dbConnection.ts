import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load variables from .env file
dotenv.config();

export const connectDatabase = async (): Promise<void> => {
    try {
        // We get the URL from the .env file. 
        const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/radar_musical_db';
        
        // Connect to MongoDB
        await mongoose.connect(dbUrl);
        console.log('Database connection was successful!');
        
    } catch (error) {
        // Good practice: If we have an error, we show it and stop the server
        console.log('Error connecting to the database:', error);
        process.exit(1); 
    }
};