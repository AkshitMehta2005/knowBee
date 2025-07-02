import express from 'express'
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from 'cors'
import {dbConnection} from './database/dbconnection.js'
import {errorMiddleware} from './middlewares/error.js' 
import userRouter from './routes/userRoutes.js'
import questionRouter from './routes/questionRoutes.js'
import answerRouter from './routes/answerRoutes.js'

const app = express();

dotenv.config();

app.use(
    cors({
        origin:process.env.FRONTEND_URL,
        methods:["GET", "POST", "DELETE", "PUT"],
        credentials:true
    })
)
 
app.use(cookieParser());  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// my all router apis

app.use("/api/v1/user", userRouter);
app.use("/api/v1/question", questionRouter);
app.use("/api/v1/answer", answerRouter);


dbConnection();

app.use(errorMiddleware);
export default app;



  