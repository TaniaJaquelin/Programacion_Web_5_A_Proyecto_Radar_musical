import dotenv from 'dotenv';
import { Server } from './server';
import { AppRoutes } from './routes/index';
import sequelizeConnection from './conf/sequelize.connection';

dotenv.config();

const port = Number(process.env.PORT);

async function main() {
    try {
        await sequelizeConnection.connect();
        const server = new Server({ port, routes: AppRoutes.router });
        server.start();
    } catch (e) {
        console.log(e)
        process.exit(1)
    }
}

main();
