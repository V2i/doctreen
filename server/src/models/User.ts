import {Schema, Model, model, Document} from 'mongoose';

export interface IUser extends Document{
    userMail: string;
    userHashedPassword: string;
    userName: string
    isAdmin?: boolean;
    isModerator?: boolean;
    userDescription?: string;
    isReported?: boolean;
    userLiked?: [string];
}

const userSchema = new Schema<IUser>({

    userMail: {
        type: String,
        required: true,
        unique: true,
    },

    userHashedPassword: {
        type : String,
        required: true,
    },

    userName: {
        type : String,
        required: true,
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },

    isModerator: {
        type: Boolean,
        default: false,
    },

    userDescription: {
        type: String,
        required: false
    },

    isReported: {
        type: Boolean,
        default: false,
    },

    userLiked: {
        type: [String],
        default: false,
    },

});

const User = model<IUser>('User', userSchema);

export { User }
