import express, {Application, Request, Response} from 'express';
import { json } from 'body-parser';
import mongoose from "mongoose";
import {userRouter} from "./routes/user";
import { authRouter } from "./routes/auth";
import {adminRouter} from "./routes/admin";
import {modsRouter} from "./routes/moderator";

const app: Application = express();
app.use(json());
app.use(authRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/mods', modsRouter);

app.get('/', ((req: Request, res: Response) => {
    res.status(404).json({error: "route does not exist"})
}));

app.listen(5000, () => console.log('Server Running on port 5000'));

/* Connection to DB */
mongoose.connect(
    "mongodb://doctreen-database:27017/",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    () => console.log('Connected to DB')
);
