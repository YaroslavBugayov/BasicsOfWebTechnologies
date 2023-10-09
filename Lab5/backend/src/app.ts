import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRouter from "./routes/user.router";
import errorMiddleware from "./middlewares/error.middleware";
import profileRouter from "./routes/profile.router";
import authMiddleware from "./middlewares/auth.middleware";

dotenv.config();

const app = express();
const port: number = Number(process.env.PORT ?? 3000);

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']

}));

app.use('/user', userRouter);
app.use('/profile', authMiddleware, profileRouter)

app.use(errorMiddleware);

app.listen(port, async () => {
    console.log(`Server run on port ${port}`);
});