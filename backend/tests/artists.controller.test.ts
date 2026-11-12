import { describe, it, expect, vi } from 'vitest';
import { Request, Response } from 'express';
import { ArtistsController } from '../src/controllers/artists.controller';
import { User, IUser } from '../src/models/User';

vi.mock('../src/models/User', () => ({
    User: {
        findAll: vi.fn(),
        findByPk: vi.fn()
    }
}));

describe('ArtistsController Tests', () => {
    const artistsController = new ArtistsController();
    const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn()
    } as unknown as Response;

    it('should return all artists', async () => {
        const req = {} as unknown as Request;
        const fakeArtists = [{ id: 1, name: 'Artist 1', role: 'artist' }] as unknown as IUser[];

        vi.mocked(User.findAll).mockResolvedValue(fakeArtists);

        await artistsController.getAllArtists(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: true, data: fakeArtists });
    });

    it('should return an artist by id', async () => {
        const req = { params: { id: '1' } } as unknown as Request;
        const fakeArtist = { id: 1, name: 'Artist 1', role: 'artist' } as unknown as IUser;

        vi.mocked(User.findByPk).mockResolvedValue(fakeArtist);

        await artistsController.getArtistById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: true, data: fakeArtist });
    });

    it('should return 404 when artist is not found', async () => {
        const req = { params: { id: '99' } } as unknown as Request;

        vi.mocked(User.findByPk).mockResolvedValue(null);

        await artistsController.getArtistById(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ success: false, message: "artist not found" });
    });
});