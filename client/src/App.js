
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import './App.css';
import { getMe } from './Config/BasketSlice';
import Navbarr from './Navbarr/Navbarr';

function App() {


  return (
    <div className="App">


     <Navbarr/>
     <Outlet/>
   
      </div>
  );
}

export default App;
