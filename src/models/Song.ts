import { Schema, model, Document, Types } from 'mongoose';

// Interface for Song document
export interface ISong extends Document {
    user_id: Types.ObjectId;
    title: string;
    music_genre: Types.ObjectId;
    audio_Url: string;
    cover_Url?: string;
    date: Date;
    active: boolean;
}

// Mongoose schema for Songs
const songSchema = new Schema<ISong>(
    {
        // Reference to the artist (User) who uploaded the song
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        // Reference to MusicGenre table
        music_genre: {
            type: Schema.Types.ObjectId,
            ref: 'MusicGenre',
            required: true
        },
        audio_Url: {
            type: String,
            required: true
        },
        cover_Url: {
            type: String,
            default: ''
        },
        date: {
            type: Date,
            default: Date.now
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

export const SongModel = model<ISong>('Song', songSchema);