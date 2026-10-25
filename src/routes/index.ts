import { Router, Request, Response } from 'express';

const router = Router();

// this is a basic route (we learn in redes II) to check if the API is working
router.get('/health', (req: Request, res: Response) => {
    return res.status(200).json({
        success: true,
        message: 'Radar Musical API is running'
    });
});

export default router;