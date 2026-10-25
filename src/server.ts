import express, { Application } from 'express';
import { connectDatabase } from './conf/dbConnection';

export class Server {
    // Attributes
    public app: Application;
    private port: string | number;

    // Constructor
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        // Call methods
        this.connectDB();
        this.middlewares();
        this.routes();
    }

    // Methods
    private async connectDB(): Promise<void> {
        await connectDatabase();
    }

    private middlewares(): void {
        // Allow the server to understand JSON data from the client
        this.app.use(express.json());
    }

    private routes(): void {
        // Basic route to test the server
        this.app.get('/api/v1/health', (req, res) => {
            // Good practice: Use 200 ONLY for real success. 
            // 500 should only be used in 'catch' blocks for server errors.
            return res.status(200).json({
                success: true,
                message: 'Server is running correctly'
            });
        });
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}