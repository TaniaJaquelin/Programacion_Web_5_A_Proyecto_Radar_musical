import { describe, it, expect, vi, beforeEach } from 'vitest';
import { registerUser, loginUser } from '../src/controllers/auth.controller';
import { UserModel } from '../src/models/User';

// Mock the User model from Mongoose
vi.mock('../src/models/User', () => ({
    UserModel: {
        findOne: vi.fn(),
        create: vi.fn()
    }
}));

// Helper to create fake Express Response (res)
const createMockResponse = () => {
    const res: any = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
};

describe('Auth Controller Unit Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('registerUser', () => {
        it('should return status 400 when data is incomplete', async () => {
            const req: any = {
                body: { email: 'user@test.com' } // missing name and password
            };
            const res = createMockResponse();

            await registerUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'Incomplete data. Name, email and password are required'
            });
        });

        it('should return status 400 when email format is invalid', async () => {
            const req: any = {
                body: {
                    name: 'Ulises',
                    email: 'invalid-email',
                    password: '123456'
                }
            };
            const res = createMockResponse();

            await registerUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'Invalid email format'
            });
        });

        it('should return status 409 when email already exists', async () => {
            const req: any = {
                body: {
                    name: 'Ulises',
                    email: 'ulises@test.com',
                    password: '123456'
                }
            };
            const res = createMockResponse();

            // Simulate user already in database
            (UserModel.findOne as any).mockResolvedValue({ _id: '123', email: 'ulises@test.com' });

            await registerUser(req, res);

            expect(res.status).toHaveBeenCalledWith(409);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'Email is already registered'
            });
        });

        it('should return status 201 and filter extra fields from req.body', async () => {
            const req: any = {
                body: {
                    name: '  Ulises  ',
                    email: 'ULISES@test.com',
                    password: '123456',
                    role: 'artist',
                    isAdmin: true // Extra bad field sent by client
                }
            };
            const res = createMockResponse();

            (UserModel.findOne as any).mockResolvedValue(null);
            (UserModel.create as any).mockResolvedValue({
                _id: 'new-id-123',
                name: 'Ulises',
                email: 'ulises@test.com',
                role: 'artist'
            });

            await registerUser(req, res);

            // Check that req.body was NOT passed directly with isAdmin
            expect(UserModel.create).toHaveBeenCalledWith({
                name: 'Ulises',
                email: 'ulises@test.com',
                password: '123456',
                role: 'artist'
            });

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                message: 'User registered successfully',
                data: {
                    id: 'new-id-123',
                    name: 'Ulises',
                    email: 'ulises@test.com',
                    role: 'artist'
                }
            });
        });
    });

    describe('loginUser', () => {
        it('should return status 400 when email or password is missing', async () => {
            const req: any = { body: { email: 'ulises@test.com' } };
            const res = createMockResponse();

            await loginUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
        });

        it('should return status 401 when password is wrong', async () => {
            const req: any = {
                body: { email: 'ulises@test.com', password: 'wrong-password' }
            };
            const res = createMockResponse();

            (UserModel.findOne as any).mockResolvedValue({
                _id: '123',
                email: 'ulises@test.com',
                password: 'correct-password'
            });

            await loginUser(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'Invalid email or password'
            });
        });

        it('should return status 200 when credentials are valid', async () => {
            const req: any = {
                body: { email: 'ulises@test.com', password: '123456' }
            };
            const res = createMockResponse();

            (UserModel.findOne as any).mockResolvedValue({
                _id: '123',
                name: 'Ulises',
                email: 'ulises@test.com',
                password: '123456',
                role: 'listener'
            });

            await loginUser(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                message: 'Login successful',
                data: {
                    id: '123',
                    name: 'Ulises',
                    email: 'ulises@test.com',
                    role: 'listener'
                }
            });
        });
    });
});