import { Request, Response, Router} from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from "../models/User";

const router = Router();

// Register
router.post('/register', async (req: Request, res: Response) => {

    const { userMail, userPassword, userName } = req.body;

    // Check if user already exists
    try {
        const emailExist = await User.findOne({userMail: userMail});
        if (emailExist) return res.status(400).send('Email already exists !');
    } catch (err) {
        res.status(400).send(err);
    }

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const userHashedPassword = await bcrypt.hash(userPassword, salt);

    // Create a new user
    const user = new User({userMail, userHashedPassword, userName})

    // Save it to DB
    try {
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).send(err);
    }

});

// Login
router.post('/login', async (req: Request, res: Response) => {

    const { userMail, userPassword } = req.body;

    //checking if email exists
    const user = await User.findOne({userMail: userMail});
    if (!user) return res.status(400).send('Email or password is wrong.');

    //if the passwords are matching
    const validPassword = await bcrypt.compare(userPassword, user.userHashedPassword);
    if (!validPassword) return res.status(400).send('Email or password is wrong.');

    //creation of the jwt
    const token = jwt.sign({_id: user._id}, "qhzbfkq9ze4g9q5s4g9qz4f9vqe98g4zq9e84gqr");

    let userInfo = await User.findById(user._id);

    res.status(200).send({userInfo, authToken: token});

});

export {router as authRouter}
