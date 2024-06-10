import mongoose from "mongoose";

const IncomeSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    amount:{
        type:Number,
        required:true,
        maxLength:12,
        trim:true
    },type:{
        type:String,
        default:"expense"
    },
    date:{
        type:Date,
        required:true,
    },
    category:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        maxLength:12,
        trim:true
    }
},{
    timestamps:true
})

const  Income = mongoose.model("Income",IncomeSchema);
export default  Income;