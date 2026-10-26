import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getAllArtists, getArtistById } from '../src/controllers/catalog.controller';
import { UserModel } from '../src/models/User';

// Mock the User model from Mongoose
vi.mock('../src/models/User', () => ({
    UserModel: {
        find: vi.fn(),
        findOne: vi.fn()
    }
}));

// Helper to create fake Express Response (res)
const createMockResponse = () => {
    const res: any = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
};

describe('Catalog Controller Unit Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getAllArtists', () => {
        it('should return status 200 and the list of artists', async () => {
            const req: any = { query: {} };
            const res = createMockResponse();

            const fakeArtists = [
                { name: 'Local Rock Band', role: 'artist' }
            ];

            // Mock UserModel.find().select()
            (UserModel.find as any).mockReturnValue({
                select: vi.fn().mockResolvedValue(fakeArtists)
            });

            await getAllArtists(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                data: fakeArtists
            });
        });

        it('should return status 400 when genre query ID is invalid', async () => {
            const req: any = { query: { genre: 'invalid-id-123' } };
            const res = createMockResponse();

            await getAllArtists(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'Invalid genre ID format'
            });
        });

        it('should return status 500 when database fails', async () => {
            const req: any = { query: {} };
            const res = createMockResponse();

            // Simulate database crash
            (UserModel.find as any).mockReturnValue({
                select: vi.fn().mockRejectedValue(new Error('Database error'))
            });

            await getAllArtists(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'Server error getting artists catalog'
            });
        });
    });

    describe('getArtistById', () => {
        it('should return status 400 when artist ID is not valid', async () => {
            const req: any = { params: { id: 'bad-id' } };
            const res = createMockResponse();

            await getArtistById(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'Invalid artist ID'
            });
        });

        it('should return status 404 when artist does not exist', async () => {
            // Valid 24-character MongoDB ObjectId
            const validId = '507f1f77bcf86cd799439011';
            const req: any = { params: { id: validId } };
            const res = createMockResponse();

            // Simulate artist not found (null)
            (UserModel.findOne as any).mockReturnValue({
                select: vi.fn().mockResolvedValue(null)
            });

            await getArtistById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'Artist not found'
            });
        });

        it('should return status 200 when artist is found', async () => {
            const validId = '507f1f77bcf86cd799439011';
            const req: any = { params: { id: validId } };
            const res = createMockResponse();

            const fakeArtist = { _id: validId, name: 'Indie Aguascalientes', role: 'artist' };

            (UserModel.findOne as any).mockReturnValue({
                select: vi.fn().mockResolvedValue(fakeArtist)
            });

            await getArtistById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                data: fakeArtist
            });
        });
    });
});