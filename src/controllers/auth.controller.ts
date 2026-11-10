import { Request, Response } from 'express';
import { User } from '../models/User';

export class AuthController {
    public async registerUser(req: Request, res: Response) {
        try {
            const user = await User.create(req.body);
            res.status(201).json({ message: "user created", user });
        } catch (error) {
            res.status(500).json({ message: "internal server error" });
        }
    }

    public async loginUser(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });

            if (!user || user.password !== password) {
                return res.status(401).json({ message: "invalid credentials" });
            }

            res.status(200).json({ message: "login successful", user });
        } catch (error) {
            res.status(500).json({ message: "internal server error" });
        }
    }
}