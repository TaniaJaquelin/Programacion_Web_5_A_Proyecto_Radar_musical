import express, { Router, type Express } from 'express';
import cors from 'cors';

// interface for the server options
type ServerOptions = {
    port: number;
    routes: Router;
    origin: string;
}

export class Server {
    // attributes
    private readonly server: Express;
    private readonly port: number;
    private readonly routes: Router;
    private readonly origin: string;

    // constructor
    constructor(options: ServerOptions) {
        this.server = express();
        this.port = options.port;
        this.routes = options.routes;
        this.origin = options.origin;
    }

    // methods

    public start(): void {
        this.server.use(cors({origin: this.origin}));
        this.server.use(express.json());
        this.server.use('/api/v1', this.routes);
        this.server.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}