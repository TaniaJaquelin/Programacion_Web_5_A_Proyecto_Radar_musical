import { Schema, model, Document, Types } from 'mongoose';

// Interface for User document
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: 'listener' | 'artist';
    music_genres: Types.ObjectId[];
    profile_Picture?: string;
    bio?: string;
    active: boolean;
}

// Mongoose schema for Users
const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['listener', 'artist'],
            default: 'listener'
        },
        // Many-to-many relation with MusicGenre table requested by teacher
        music_genres: [
            {
                type: Schema.Types.ObjectId,
                ref: 'MusicGenre'
            }
        ],
        profile_Picture: {
            type: String,
            default: ''
        },
        bio: {
            type: String,
            default: ''
        },
        // Logical delete
        active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

export const UserModel = model<IUser>('User', userSchema);