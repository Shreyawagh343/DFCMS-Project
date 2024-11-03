import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import cors from "cors"
import UserRouter from "./Router/Userrouter.js"
import CaseRouter from "./Router/CaseRouter.js"
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true, // Include cookies
    allowedHeaders: ['Authorization', 'Content-Type'], // Allow specific headers
  }));
app.use(cookieParser());

const Port = process.env.Port || 4000;
const MongoDB = process.env.MongoDB;

try {
    mongoose.connect(MongoDB,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    });
    console.log("connected Sucessfully");
}
    catch(error){
        console.log("Error:",error)
    }

app.use("/users",UserRouter);
app.use("/cases",CaseRouter);

app.listen(Port,()=>{
        console.log(`server is working ${Port}`)
})