import { Router, Request, Response } from 'express';
import catalogRoutes from './catalog.routes';

const router = Router();

// Basic route to check if API is working
router.get('/health', (req: Request, res: Response) => {
    return res.status(200).json({
        success: true,
        message: 'Radar Musical API is running'
    });
});

// Catalog routes
router.use('/catalog', catalogRoutes);

export default router;