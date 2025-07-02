import Navbar from '@/components/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div>
        <Navbar />
        <div className='text-center font-extrabold text-xl '>
            {/* <Outlet /> */}
        </div>
    </div>
  )
}

export default RootLayout