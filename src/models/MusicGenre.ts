import { Schema, model, Document } from 'mongoose';

// Interface for MusicGenre document
export interface IMusicGenre extends Document {
    name: string;
    description?: string;
    active: boolean;
}

// Mongoose schema for music_genres
const musicGenreSchema = new Schema<IMusicGenre>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        description: {
            type: String,
            default: ''
        },
        active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

export const MusicGenreModel = model<IMusicGenre>('MusicGenre', musicGenreSchema);