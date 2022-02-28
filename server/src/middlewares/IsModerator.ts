import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { User } from "../models/User";

const isModerator = async (req: Request, res: Response, next: NextFunction) => {

    // Check if user has a token
    const token = req.header('auth-token');

    if (token) {

        // Check if token is valid
        try {

            //TODO: Check _id in token payload
            const {_id} = jwt.verify(token, "qhzbfkq9ze4g9q5s4g9qz4f9vqe98g4zq9e84gqr");

            const user = await User.findOne({_id})

            if(!user) return res.status(401).json({message: 'You are not authenticated'})

            // Check if user is moderator
            if(user.isModerator === false || user.isModerator === undefined) {
                return res.status(403).json({message: 'You are not a moderator'});
            }

        } catch (err) {
            return res.status(400).json({err});
        }

    } else return res.status(401).json({message: 'You are not authenticated'});

    return next();

};

export default isModerator;
