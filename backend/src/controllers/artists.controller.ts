import { Request, Response } from 'express';
import { User } from '../models/User';


export class ArtistsController {
    public async getAllArtists(_req: Request, res: Response) {
        try {
            const artists = await User.findAll({
                where: { role: 'artist' },
                attributes: { exclude: ['password'] }
            });
            res.status(200).json({ success: true, data: artists });
        } catch (error) {
            res.status(500).json({ success: false, message: "internal server error" });
        }
    }

    public async getArtistById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const artist = await User.findByPk(id, {
                attributes: { exclude: ['password'] }
            });

            if (!artist) {
                return res.status(404).json({ success: false, message: "artist not found" });
            }

            res.status(200).json({ success: true, data: artist });
        } catch (error) {
            res.status(500).json({ success: false, message: "internal server error" });
        }
    }
};