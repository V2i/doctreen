import { Request, Response, Router} from 'express';
import { User } from "../models/User";
import bcrypt from "bcryptjs";

const router = Router();

/* GET users listing */
router.get('/list', async (req: Request, res: Response) => {

    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* PATCH  user by id */
router.patch('/:id', async (req: Request, res: Response) => {

    try{

        const user = await User.findById(req.params.id);

        if(!user) {
            return res.status(404)
        }

        if(user._id != req.params.id) {
            return res.status(403);
        }

        const validPassword = await bcrypt.compare(req.body.userPassword, user.userHashedPassword);
        if (!validPassword) {
            //hash the password
            const salt = await bcrypt.genSalt(10);
            const userHashedPassword = await bcrypt.hash(req.body.userPassword, salt);
            await User.updateOne({_id: req.params.id}, {$set: {
                    userMail: user.userMail,
                    userHashedPassword: userHashedPassword,
                    userName: req.body.userName,
                    isAdmin: user.isAdmin,
                    isModerator: user.isModerator,
                    userDescription: req.body.userDescription,
                    isReported: user.isReported,
                    isBanned: user.isBanned,
                    userLiked: req.body.userLiked,
                }})
        } else {
            await User.updateOne({_id: req.params.id}, {$set: {
                    userMail: user.userMail,
                    userHashedPassword: req.body.userPassword,
                    userName: req.body.userName,
                    isAdmin: user.isAdmin,
                    isModerator: user.isModerator,
                    userDescription: req.body.userDescription,
                    isReported: user.isReported,
                    isBanned: user.isBanned,
                    userLiked: req.body.userLiked,
                }})
        }


        const updatedUser = await User.findById(req.params.id);
        return res.status(200).json(updatedUser);
    } catch (err) {
        return res.status(500).json(err);
    }

});

export {router as userRouter}
