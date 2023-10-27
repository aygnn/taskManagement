import React from 'react'
import './Navbarr.scss';
import { Link } from 'react-router-dom';

export default function Navbarr() {
  return (
    <div className='main-nav'>
      <div className='logo'>
        <Link to={"/"}>
        <img src='https://hive.com/wp-content/uploads/2022/05/Colored-Logo.svg'/>
        </Link>
       
      </div>

      <div className='log-sign'>
        <div className='login'>
          <button>Login</button>
        </div>
        <div className="sign">
    <button>Sign  Up</button>
        </div>

      </div>
    </div>
  )
}
