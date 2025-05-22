import express from 'express';
import cookieParser from 'cookie-parser';
import { authRouter } from 'routes/auth.routes';
import { errorHandler } from 'middlewares/errorHandler';


export const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/user', authRouter);


app.use(errorHandler)