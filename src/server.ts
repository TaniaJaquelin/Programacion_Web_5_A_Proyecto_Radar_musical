import express, { Application, Router } from 'express';
import cors from 'cors';

// interface for the server options
interface ServerOptions {
    port: number;
    routes: Router;
}

export class Server {
    // attributes
    public app: Application;
    private port: number;
    private routes: Router;

    // constructor
    constructor(options: ServerOptions) {
        this.app = express();
        this.port = options.port || 3000;
        this.routes = options.routes;

        this.middlewares();
        this.loadRoutes();
    }

    // methods
    private middlewares(): void {
        this.app.use(cors());
        this.app.use(express.json());
    }

    private loadRoutes(): void {
        this.app.use('/api/v1', this.routes);
    }

    public start(): void {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}