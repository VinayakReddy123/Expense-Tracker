import Expense from "../models/expenseModel.js";


const addExpense=async (req,res)=>{
    const {title,amount,category,description,date}=req.body;
    const expense=new Expense({title,amount,category,description,date});
    try{
        if(!title || !category || !description || !date){
            return res.status(400).json({msg:"Please enter all fields"});
        }
        if(amount<=0 || !amount === 'number'){
            return res.status(400).json("Amount must be a positive integer")
        }
        await expense.save();
        res.status(201).json({msg:'Expense added',expense});
    }catch(err){
        res.status(500).json({msg:'Unable to add expenses'});
    }
}

const getExpenses=async(req,res)=>{
    try{
       const expenses=await Expense.find().sort('-date') // sort
       res.status(200).json(expenses);
    }catch(err){
       res.status(500).json({msg: 'Error getting data'}) ;
    }
}

const deleteExpense = async (req, res) => {
    const id = req.params.id;
    try {
      const result = await Expense.findOneAndDelete({ _id: id });
      if (result) {
        res.status(200).json({ msg: 'Income deleted successfully' });
      } else {
        res.status(500).json({ msg: 'No such income was found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Internal server error' });
    }
  };




export {
    addExpense,
    getExpenses,
    deleteExpense
} ;