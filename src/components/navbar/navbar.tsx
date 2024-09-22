'use-client';
import React, { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { redirect } from 'next/navigation';
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { initialState, setLoggedUser } from '@/redux/features/userSlice';
import { User } from '@/types/UserTypes';
import Image from 'next/image'
import NeraLogo from '../../assets/images/Logo-Nera.jpg';
export const NavBar = () => {

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
        <div className="flex  relative flex-row h-25 bg-white shadow-xl rounded-b-lg p-5">
            <div>
                <Image className="object-contain" src={NeraLogo} width={180} alt="Nera Logo"/>
            </div>
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