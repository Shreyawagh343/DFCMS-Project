import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import cors from "cors"
import UserRouter from "./Router/Userrouter.js"

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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

app.listen(Port,()=>{
        console.log(`server is working ${Port}`)
})