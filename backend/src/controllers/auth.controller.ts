import { Request, Response } from 'express';
import { User } from '../models/User';
import { hashPassword } from '../utils/password.util';
import { comparePassword } from '../utils/password.util';


export class AuthController {
    public async registerUser(req: Request, res: Response) {
        try {
            const { name, email, password, repeatPassword, role, profile_Picture, bio} = req.body;
            
            if (password !== repeatPassword) {
                return res.status(400).json({ message: "passwords does not match" })
            }

            //is necessary encrypt the password  with "/utils/hasPassword"
            const hash = await hashPassword(password);

            //its optional to send an activation code (email)

            //finally we save the user in the DB
            const user = new User();

            user.name = name;
            user.email = email;
            user.password = hash;
            user.role = role;
            user.profile_Picture = profile_Picture;
            user.bio = bio;

            await user.save();

            res.status(201).json({ message: "user created"});
        } catch (error) {
            res.status(500).json({ message: "internal server error" });
        }
    }

    public async loginUser(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ where: { email } });

            //we need to change this part because of the hash
            if (!user || !await comparePassword(password,user.password)) {
                return res.status(401).json({ message: "invalid credentials" });
            }

            res.status(200).json({ message: "login successful" });
        } catch (error) {
            res.status(500).json({ message: "internal server error" });
        }
    }
}