import { Router } from 'express';
import { ArtistsController } from '../controllers/artists.controller';

export class ArtistsRoutes {
    static get router(): Router {
        const router = Router();
        const artistsController = new ArtistsController();

        router.get('/', artistsController.getAllArtists);
        router.get('/:id', artistsController.getArtistById);

        return router;
    }
}