import Income from "../models/incomeModel.js";


const addIncome=async (req,res)=>{
    const {title,amount,category,description,date}=req.body;
    const income=new Income({title,amount,category,description,date});
    try{
        if(!title || !category || !description || !date){
            return res.status(400).json({msg:"Please enter all fields"});
        }
        if(amount<=0 || !amount === 'number'){
            return res.status(400).json("Amount must be a positive integer")
        }
        await income.save();
        res.status(201).json({msg:'income added',income});
    }catch(err){
        res.status(500).json({msg:'Unable to add incomes'});
    }
}

const getIncomes=async(req,res)=>{
    try{
       const incomes=await Income.find().sort('-date') // sort
       res.status(200).json(incomes);
    }catch(err){
       res.status(500).json({msg: 'Error getting data'}) ;
    }
}

const deleteIncome = async (req, res) => {
    const id = req.params.id;
    try {
      const result = await Income.findOneAndDelete({ _id: id });
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
    addIncome,
    getIncomes,
    deleteIncome
} ;