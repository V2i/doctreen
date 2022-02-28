import { Request, Response, NextFunction, Router} from 'express';
import {User} from "../models/User";
import bcrypt from "bcryptjs";

const router = Router();

/* POST user */
router.post('/', async (req: Request, res: Response) => {

    const { userMail, userPassword, userName, isAdmin, isModerator, userDescription, isReported, userLiked} = req.body;

    //checking if user already exist
    try {
        const emailExist = await User.findOne({userMail: userMail});
        if (emailExist) return res.status(400).send('Email already exists.');
    } catch (err) {
        res.status(400).send(err);
    }

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const userHashedPassword = await bcrypt.hash(userPassword, salt);

    // Create a new user
    const newUser = new User({userMail, userHashedPassword, userName, isAdmin, isModerator, userDescription, isReported, userLiked})

    //posting to db
    try {
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).send(err);
    }
});

/* PATCH  user by id */
router.patch('/:id', async (req: Request, res: Response) => {

    try{
        const user = await User.findById(req.params.id);

        if(!user) {
            return res.status(404)
        }

        await User.updateOne({_id: req.params.id}, {$set: {
                userMail: user.userMail,
                userHashedPassword: user.userHashedPassword,
                userName: req.body.userName,
                isAdmin: user.isAdmin,
                isModerator: req.body.isModerator,
                userDescription: req.body.userDescription,
                isReported: req.body.isReported,
                userLiked: user.userLiked,
            }})

        const updatedUser = await User.findById(req.params.id);
        return res.status(200).json(updatedUser);
    } catch (err) {
        return res.status(500).json(err);
    }

});

export {router as adminRouter}
