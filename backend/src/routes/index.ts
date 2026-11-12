import { Router, Request, Response } from 'express';
import {ArtistsRoutes} from './artists.routes';
import {AuthRoutes} from './auth.routes';

export class AppRoutes {
    static get router(): Router {
        const router = Router();

        router.use("/artists", ArtistsRoutes.router);
        router.use("/auth", AuthRoutes.router);
        return router;
    }
}
