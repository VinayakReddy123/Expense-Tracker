import React, { useEffect, useMemo } from 'react';
import bg from './images/bg.png';
import styled from 'styled-components';
import { MainLayout,InnerLayout } from './styles/Layout';
import Orb from './components/Orb/Orb';
import Navigation from './components/Navigation/Navigation';
import { useState } from 'react';
import Dashboard from './components/DashBoard/Dashboard';
import Income from './components/Income/Income';
import Expenses from './components/Expenses/Expenses'; 
import { useGlobalContext } from './context/globalContext';

function App() {
  const {totalBalance,totalIncome,totalExpenses}=useGlobalContext();
  const [active,setActive]=useState(1);
  
  const orbMemo=useMemo(()=>{
    return <Orb />
  },[]);

  const displayData=()=>{
     switch(active){
       case 1 : return <Dashboard />
       case 2 : return <Dashboard/>
       case 3 : return <Income />
       case 4 : return <Expenses />
       default : return <Dashboard />;
     }
  }

  return (
    <>
    <AppStyled bg={bg} className="App">
       {orbMemo}
        <MainLayout>
            <Navigation active={active} setActive={setActive} />
            <main>
               {displayData()}
            </main>
        </MainLayout>
    </AppStyled> 
    </>
  );
}

const  AppStyled=styled.div`
   height:100vh;
   background-image: url( ${props=>props.bg});
   position:relative;
   main{
      flex: 1;
      background: rgba(252, 246, 249, 0.78);
      border: 3px solid #FFFFFF;
      backdrop-filter: blur(4.5px);
      border-radius: 32px;
      overflow-x: hidden;
      &::-webkit-scrollbar{
        width: 0;
      }
   }
`;


export default App;
