import { Request, Response } from 'express';
import { UserModel } from '../models/User';

// Interface
interface AuthBody {
    name?: string;
    email?: string;
    password?: string;
    role?: 'listener' | 'artist';
}

//  Validations 
const isValidEmail = (email: any): boolean => {
    if (typeof email !== 'string') return false;
    return email.includes('@') && email.includes('.');
};

// Register new user
export const registerUser = async (req: Request, res: Response): Promise<any> => {
    // Extract specific fields, never pass req.body directly to database
    const { name, email, password, role } = req.body as AuthBody;

    if (!name || !email || !password) {
        // 400 Bad Request for incomplete data
        return res.status(400).json({
            success: false,
            message: 'Incomplete data. Name, email and password are required'
        });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid email format'
        });
    }

    try {
        // Check if email already exists in database
        const existingUser = await UserModel.findOne({ email: email.toLowerCase().trim() });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'Email is already registered'
            });
        }

        // Only allow valid roles ('listener' or 'artist')
        const safeRole = role === 'artist' ? 'artist' : 'listener';

        // Create user with safe fields only 
        const newUser = await UserModel.create({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: password,
            role: safeRole
        });

        // 201 Created when a new record is saved
        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (error) {
        // 500 Internal Server Error only when server crashes
        return res.status(500).json({
            success: false,
            message: 'Server error during registration'
        });
    }
};

// Login user
export const loginUser = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body as AuthBody;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Email and password are required'
        });
    }

    try {
        const user = await UserModel.findOne({
            email: email.toLowerCase().trim(),
            active: true
        });

        // 401 Unauthorized when credentials are wrong
        if (!user || user.password !== password) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // 200 OK for successful login
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error during login'
        });
    }
};