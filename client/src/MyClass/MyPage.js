import React from 'react'
import ClassNavbar from './ClassNavbar/ClassNavbar'
import { Outlet } from 'react-router-dom'

export default function MyPage() {
  return (
    <div>
        <ClassNavbar/>
        <Outlet/>
        
        
    </div>
  )
}
