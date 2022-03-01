import { Request, Response, Router} from 'express';
import { User } from "../models/User";

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
            }});

        const updatedUser = await User.findById(req.params.id);
        return res.status(200).json(updatedUser);
    } catch (err) {
        return res.status(500).json(err);
    }

});

/* REPORT user by id */
router.patch('/report/:id', async (req: Request, res: Response) => {

    try{

        const user = await User.findById(req.params.id);

        if(!user) {
            return res.status(404)
        }

        await User.updateOne({_id: req.params.id}, {
                isReported: true
            });

        const updatedUser = await User.findById(req.params.id);
        return res.status(200).json(updatedUser);
    } catch (err) {
        return res.status(500).json(err);
    }

});

export {router as userRouter}
