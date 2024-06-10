import express from "express";
import cors from "cors";
import db from "./db/db.js";
import router from "./routes/transactions.js";

const app=express();

//middlewares
app.use(express.json());
app.use(cors());
app.use('/api/v1',router); // baseurl is   /api/v1





const port=9000;
const server=()=>{
    db();
    app.listen(9000,()=>console.log('Server is running on port',port));
}

server();