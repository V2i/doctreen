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
        await User.updateOne({_id: req.params.id}, {$set: {...req.body}})
        const updatedUser = await User.findById(req.params.id);
        return res.status(200).json(updatedUser);
    } catch (err) {
        return res.status(500).json(err);
    }

});

export {router as userRouter}
