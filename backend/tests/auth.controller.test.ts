import { describe, it, expect, vi } from 'vitest';
import { Request, Response } from 'express';
import { AuthController } from '../src/controllers/auth.controller';
import { User, IUser } from '../src/models/User';

vi.mock('../src/models/User', () => ({
    User: {
        create: vi.fn(),
        findOne: vi.fn()
    }
}));

describe('AuthController Tests', () => {
    const authController = new AuthController();
    const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn()
    } as unknown as Response;

    it('should create a user successfully', async () => {
        const req = { 
            body: { name: 'Test', email: 'test@test.com', password: '123' } 
        } as unknown as Request;
        
        const createdUser = { id: 1, name: 'Test', email: 'test@test.com', password: '123' } as unknown as IUser;
        vi.mocked(User.create).mockResolvedValue(createdUser);

        await authController.registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: "user created", user: createdUser });
    });

    it('should login a user successfully', async () => {
        const req = { 
            body: { email: 'test@test.com', password: '123' } 
        } as unknown as Request;
        
        const foundUser = { id: 1, email: 'test@test.com', password: '123' } as unknown as IUser;
        vi.mocked(User.findOne).mockResolvedValue(foundUser);

        await authController.loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: "login successful", user: foundUser });
    });

    it('should return 401 when login credentials are invalid', async () => {
        const req = { 
            body: { email: 'test@test.com', password: 'wrong' } 
        } as unknown as Request;
        
        const foundUser = { id: 1, email: 'test@test.com', password: '123' } as unknown as IUser;
        vi.mocked(User.findOne).mockResolvedValue(foundUser);

        await authController.loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: "invalid credentials" });
    });
});