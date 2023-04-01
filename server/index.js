import express from 'express';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import http from 'http'
import mongoose from "mongoose";
import dotenv from 'dotenv'
import routes from './src/routes/index.js';
import morgan from 'morgan'
dotenv.config()
const app = express()

app.use("/api/v1",routes)

app.use(cors());
app.use(morgan("tiny"))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const port = process.env.PORT || 4000;
const server = http.createServer(app);

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("MongoDB connected successfully!");
    server.listen(port,()=>console.log(`Server is listening on port: ${port} `))
}).catch(err=>{
    console.log({err})
    process.exit(1)
})
