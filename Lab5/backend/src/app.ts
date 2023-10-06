import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRouter from "./routes/user.router";
import errorMiddleware from "./middlewares/error.middleware";

dotenv.config();

const app = express();
const port: number = Number(process.env.PORT ?? 3000);

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/user', userRouter);

app.use(errorMiddleware);

app.listen(port, async () => {
    console.log(`Server run on port ${port}`);
});