import mongoose from "mongoose";


const db=async()=>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/expense');
        console.log('Connected to Database succcessfully');
    }catch(err){
        console.log(err);
    }
}

export default db;