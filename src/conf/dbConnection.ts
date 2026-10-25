import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// get database variables from the file ".env"
const dbHost = process.env.DB_HOST || 'localhost';
const dbName = process.env.DB_NAME || 'radar_musical_db';
const mongoUri = process.env.MONGO_URI || `mongodb://${dbHost}:27017/${dbName}`;

// dbConnection object
const dbConnection = {
    connect: async (): Promise<void> => {
        try {
            await mongoose.connect(mongoUri);
            console.log('MongoDB database connected');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            throw error;
        }
    }
};

export default dbConnection;