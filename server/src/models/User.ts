import {Schema, model, Model, Document} from 'mongoose';

interface IUser {
    userMail: string;
    userPassword: string;
    userName: string
    isAdmin?: boolean;
    isModerator?: boolean;
    userDescription?: string;
    isReported?: boolean;
    userLiked?: [string];
}

interface userDoc extends Document {
    userMail: string;
    userPassword: string;
    userName: string
    isAdmin?: boolean;
    isModerator?: boolean;
    userDescription?: string;
    isReported?: boolean;
    userLiked?: [string];
}

interface userModelInterface extends Model<userDoc> {
    build(attr: IUser): userDoc;
}

const userSchema = new Schema({

    userMail: {
        type: String,
        required: true,
    },

    userPassword: {
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

const User = model<any, userModelInterface>('User', userSchema);

userSchema.statics.build = (attr: IUser) => {
    return new User(attr);
}

export { User }
