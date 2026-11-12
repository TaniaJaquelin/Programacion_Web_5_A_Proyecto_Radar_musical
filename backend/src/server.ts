import express, { Router, type Express } from 'express';

// interface for the server options
type ServerOptions = {
    port: number;
    routes: Router;
}

export class Server {
    // attributes
    private readonly server: Express;
    private readonly port: number;
    private readonly routes: Router;

    // constructor
    constructor(options: ServerOptions) {
        this.server = express();
        this.port = options.port;
        this.routes = options.routes;
    }

    // methods

    public start(): void {
        this.server.use(express.json());
        this.server.use('/api/v1', this.routes);
        this.server.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}