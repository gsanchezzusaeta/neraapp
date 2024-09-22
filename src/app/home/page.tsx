"use client";
import CuentaInfo from '@/components/cards/cuentaInfo/CuentaInfo';
import CuentasCard from '@/components/cards/cuentasUser/CuentasCard';
import { NavBar } from '@/components/navbar/navbar'
import { setActiveCuenta } from '@/redux/features/userSlice';
import { useAppSelector } from '@/redux/hooks';
import { Cuenta } from '@/types/CuentaTypes';
import { log } from 'console';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

const Home = () => {

  const state = useAppSelector(state => state.persistedReducer)
  const active_cuenta = useAppSelector(state => state.persistedReducer.loggedUser.cuentas.find(cuenta => cuenta.active))


  const dispatch = useDispatch()

  const handleActiveCuenta = (id: Number) => dispatch(setActiveCuenta({id}))

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    console.log(active_cuenta);
  }, [state]);


  if (!isMounted) return null;

  return (
    <div className='flex flex-col min-h-screen min-w-full relative'>
      <NavBar />
      <div className='flex h-[85vh] relative p-6 gap-10'>
        <CuentasCard cuentas={state.loggedUser.cuentas} id={state.loggedUser.id} handleActive={handleActiveCuenta} />
        <CuentaInfo cuenta={!active_cuenta ?  undefined : active_cuenta}/> 
      </div>
    </div>
  )
}

export default Home