import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import {Menu, SparklesIcon, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import {useUser ,SignIn} from '@clerk/clerk-react';

const Layout = () => {
  const navigate =useNavigate();
  const [sidebar, setSidebar]= useState(false);
  const {user}= useUser();

  return  user ? (
    <>
    <div className="flex flex-col items-start justify-start h-screen">
    <div className="w-full px-8 min-h-14 flex items-center justify-between border-b border-gray-200">
      <div className='flex justify-between'>
              <SparklesIcon className='mt-2 to-blue-500' onClick={()=>
            navigate('/')}/>
           <span className='text-3xl ml-2 text-blue-600 font-bold' onClick={()=>
            navigate('/')}>With-Ai</span>
            </div>
      {
       sidebar ? <X onClick={()=>setSidebar(false)} className="w-6 h-6 text-gray-600 sm:hidden"/> :
       <Menu onClick={()=>setSidebar(true)} className="w-6 h-6 text-gray-600 sm:hidden" />
      }
    </div>

    <div className="flex-1 w-full flex h-[calc(100vh-64px)]">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
        <div className="flex-1 bg-[#F4F7FB]">
          <Outlet/>
        </div>
    </div>
    </div>
    </>
  ): (
    <div className="flex item-center justify-center h-screen my-20">
      <SignIn/>
    </div>
  )
}

export default Layout