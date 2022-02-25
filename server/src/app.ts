import express, {Application, Request, Response} from 'express';
import { json } from 'body-parser';
import { authRouter } from "./routes/auth";
import mongoose from "mongoose";

const app: Application = express();
app.use(json());
app.use(authRouter);

app.get('/', ((req: Request, res: Response) => {
    res.status(404).json({error: "route does not exist"})
}));

app.listen(5000, () => console.log('Server Running on port 5000'));

/* Connection to DB */
mongoose.connect(
    "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    () => console.log('Connected to DB')
);
