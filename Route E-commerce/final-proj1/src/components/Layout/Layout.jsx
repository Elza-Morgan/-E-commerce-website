import React from 'react'
import Style from './Layout.module.css'
import  NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'


export default function Layout() {
  return (
    <>

      <NavBar/>
          <div className='container mx-auto my-6 py-6'>
            <Outlet/>
          </div>
      {/* <Footer/>  */}


    </>
  )
}
