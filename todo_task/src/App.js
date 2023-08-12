import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import SideBar from './components/SideBar/SideBar';
import MarketingPlan from './components/MarketingPlan/MarketingPlan';
import DataProvider from './context/DataProvider';
import { dataContext } from './context/DataProvider';
import { useState } from 'react';

function App() {
  const [status, setStatus] = useState([])
  // const [column, setColumn] = useState("null")
  return (
    <dataContext.Provider value={{ setStatus, status }}>
      <DataProvider />
      {/* <div className='row'> */}
      <NavBar />
      <div className='App' style={{ display: 'flex' }}>
        {/* <div className='col-3'> */}
        <SideBar />
        {/* </div> */}
        <div className='col-10'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketing-plan" element={<MarketingPlan />} />
        </Routes>
        </div>
      </div>
      {/* </div> */}
    </dataContext.Provider>
  );
}

export default App;
