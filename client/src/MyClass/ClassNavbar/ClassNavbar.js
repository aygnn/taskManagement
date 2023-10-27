import React from 'react'
import { Link } from 'react-router-dom'
import './ClassNavbar.scss';



export default function ClassNavbar() {
  return (
    <div className='MyClass'>
        <div className='class-nav'>
            <div className='work'>
    <Link to={"classwork"}>Classwork</Link>
            </div>
            <div className='people'>
                <Link to={"people"}>People</Link>

            </div>

        </div>


    </div>
  )
}
