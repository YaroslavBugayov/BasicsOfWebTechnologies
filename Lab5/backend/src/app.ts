import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import userRouter from "./routes/user.router";
import errorMiddleware from "./middlewares/error.middleware";
import profileRouter from "./routes/profile.router";
import authMiddleware from "./middlewares/auth.middleware";

dotenv.config();

const app = express();
const port: number = Number(process.env.PORT ?? 3000);

app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Request-Headers', 'Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    if (req.method == 'OPTIONS') {
        res.status(204).end()
    }
    next();
});

app.use('/user', userRouter);
app.use('/profile', authMiddleware, profileRouter)

app.use(errorMiddleware);

app.listen(port, async () => {
    console.log(`Server run on port ${port}`);
});