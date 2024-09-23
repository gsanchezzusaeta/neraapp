'use-client';
import React from 'react'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { IoIosLogOut } from "react-icons/io";
import { setLoggedUser } from '@/redux/features/userSlice';
import { User } from '@/types/UserTypes';
import Image from 'next/image'
import NeraLogo from '../../assets/images/Logo-Nera.jpg';
export const NavBar = () => {

    const nombre = useAppSelector(state => state.persistedReducer.loggedUser.nombre)

    const dispatch = useAppDispatch()

    const emptyUser = {
        id:0,
        username: '',
        apellido: '',
        nombre: '',
        cuentas: [],
        auth: false
    } as User

    const logout = () => dispatch(setLoggedUser(emptyUser))

    return (
        <div className="flex justify-between relative flex-row h-25 bg-white shadow-xl rounded-b-lg p-5">
            <div>
                <Image className="object-contain" src={NeraLogo} width={180} alt="Nera Logo"/>
            </div>
            <span className='flex items-center ml-9 text-2xl italic font-semibold'>
                Bienvenido {nombre}
            </span>
            <div className='flex flex-row ml-auto gap-6'>
                <div className='flex flex-col items-center justify-center cursor-pointer' onClick={logout}>
                    <IoIosLogOut color='green' size={'2rem'} />
                    <span>
                        Logout
                    </span>
                </div>
            </div>
        </div>
    )
}