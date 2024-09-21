"use client";
import CuentasCard from '@/components/cards/cuentas/CuentasCard';
import { useAppSelector } from '@/redux/hooks'
import React, { useEffect } from 'react'

const Home = () => {

  const user = useAppSelector(state => state.userReducer)

  useEffect(() => {
    console.log(user);
    
  }, [user])
  
  return (
    <div className='flex-auto'>

        <CuentasCard cuentas={user.cuentas}/>
        
    </div>
  )
}

export default Home