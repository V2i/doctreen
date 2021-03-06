import express, {Application, Request, Response, NextFunction, Router} from 'express';
import {User} from "../models/User";

const router = Router();

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
                isModerator: user.isModerator,
                userDescription: req.body.userDescription,
                isReported: req.body.isReported,
                isBanned: req.body.isReported,
                userLiked: user.userLiked,
            }})

        const updatedUser = await User.findById(req.params.id);
        return res.status(200).json(updatedUser);
    } catch (err) {
        return res.status(500).json(err);
    }

});

export {router as modsRouter}
