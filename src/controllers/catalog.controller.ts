import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { UserModel } from '../models/User';

// ----------- Validations -----------
const isValidMongoId = (id: any): boolean => {
    return typeof id === 'string' && Types.ObjectId.isValid(id);
};

// ----------- Get all local artists for catalog -----------
export const getAllArtists = async (req: Request, res: Response): Promise<any> => {
    try {
        // Optional filter by music genre in query (?genre=...)
        const genreId = req.query.genre as string | undefined;
        const filter: any = { role: 'artist', active: true };

        if (genreId) {
            if (!isValidMongoId(genreId)) {
                // GOOD PRACTICE: 400 Bad Request when query param is invalid
                return res.status(400).json({
                    success: false,
                    message: 'Invalid genre ID format'
                });
            }
            filter.music_genres = genreId;
        }

        // Exclude password field for security
        const artists = await UserModel.find(filter).select('-password');

        // GOOD PRACTICE: 200 OK for successful GET request
        return res.status(200).json({
            success: true,
            data: artists
        });
    } catch (error) {
        // GOOD PRACTICE: 500 Internal Server Error only when server fails
        return res.status(500).json({
            success: false,
            message: 'Server error getting artists catalog'
        });
    }
};

// ----------- Get artist profile by ID -----------
export const getArtistById = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    // Check if ID is valid
    if (!isValidMongoId(id)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid artist ID'
        });
    }

    try {
        const artist = await UserModel.findOne({
            _id: id,
            role: 'artist',
            active: true
        }).select('-password');

        // GOOD PRACTICE: 404 Not Found if resource does not exist
        if (!artist) {
            return res.status(404).json({
                success: false,
                message: 'Artist not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: artist
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error getting artist information'
        });
    }
};