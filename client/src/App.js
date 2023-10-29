
import { Outlet } from 'react-router-dom';
import './App.css';
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
