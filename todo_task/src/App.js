import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import SideBar from './components/SideBar/SideBar';
import MarketingPlan from './components/MarketingPlan/MarketingPlan';
import DataProvider from './context/DataProvider';
import {dataContext } from './context/DataProvider';
import { useState } from 'react';

function App() {
  const [data, setData] = useState(null)
  return (
    <dataContext.Provider value={{ setData, data }}>
      <DataProvider />
      <NavBar />
      <div className='App' style={{ display: 'flex' }}>
        <SideBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketing-plan" element={<MarketingPlan />} />
        </Routes>
      </div>
    </dataContext.Provider>
  );
}

export default App;
