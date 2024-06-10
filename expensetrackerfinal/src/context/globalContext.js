import React, {  useContext } from "react";
import axios from 'axios';
import { useState } from "react";

const BASE_URL="http://localhost:9000/api/v1/";

const GlobalContext=React.createContext();

export const GlobalProvider=({children})=>{

    const [incomes,setIncomes]=useState([]);
    const [expenses,setExpenses]=useState([]);
    const [error,setError]=useState(null);

    const addIncome=async(income)=>{
        try{
            const response=await axios.post(`${BASE_URL}add-income`,income);    
        }catch(err){
            // setError(err.response.data.message);
            console.log(err);
        }
        getIncomes();
    }

    const getIncomes=async()=>{
        const response=await axios.get(`${BASE_URL}get-incomes`);
        setIncomes(response.data);
    }

    const deleteIncome=async(id)=>{
        const res=await axios.delete(`${BASE_URL}delete-income/${id}`);
        getIncomes();
    }

    const totalIncome=()=>{
        let totalIncome=0;
        incomes.forEach((income)=>{
            totalIncome+=income.amount;
        })
        return totalIncome;
    }
    
    const addExpense=async(expense)=>{
        try{
        const res=await axios.post(`${BASE_URL}add-expense`,expense);
        }catch(err){
            console.log(err);
        }
        getExpenses();
    }
    const getExpenses=async()=>{
        const res=await axios.get(`${BASE_URL}get-expenses`);  
        setExpenses(res.data);
    }
    const deleteExpense=async(id)=>{
        await axios.delete(`${BASE_URL}delete-expense/${id}`);
        getExpenses();
    }
    const totalExpenses=()=>{
        let totalExpense=0;
        expenses.forEach((expense)=>{
            totalExpense+=expense.amount;
        })
        return totalExpense;
    }

    const totalBalance=()=>{
        return totalIncome()-totalExpenses();
    }

    const transactionHistory=()=>{
        const history=[...incomes, ...expenses]; 
        history.sort((a,b)=>{
            return new Date(b.createdAt)-new Date(a.createdAt);
        })
        return history;
    }

    return(
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            expenses,
            deleteIncome,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory
        }}   
        >
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext=()=>{
    return useContext(GlobalContext);
}