import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

export class AuthRoutes {
    static get router(): Router {
        const router = Router();
        const authController = new AuthController();

        router.post('/register', authController.registerUser);
        router.post('/login', authController.loginUser);

        return router;
    }
}