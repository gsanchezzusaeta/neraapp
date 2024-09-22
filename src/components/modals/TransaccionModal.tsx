import React, { FormEvent, Fragment, useEffect } from 'react'
import { IconType } from 'react-icons'
import type { ModalOptions, ModalInterface } from 'flowbite'
import { Modal } from "flowbite-react";
import { useState } from "react";
import CuentaForm from '../forms/CuentaForm';
import { useLazyGetUserByIdQuery } from '@/redux/api/userApi';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Swal from 'sweetalert2'
import TransaccionForm from '../forms/TransaccionForm';
import clsx from 'clsx';
import { useCreateTransaccionMutation } from '@/redux/api/transaccionApi';
// import { addTransaction } from '@/redux/features/appSlice';
import { useLazyGetBalanceByIdQuery } from '@/redux/api/cuentaApi';
import { addTransaction } from '@/redux/features/userSlice';


const TransaccionModal = ({ Icon, id, tipo, classes, btnText, iconSize, iconColor}: 
    { Icon: IconType, id: number, tipo: string, classes:string, btnText: string, iconSize: number, iconColor:string }) => {

    const [openModal, setOpenModal] = useState(false);

    const [sendForm, { data, isError, isLoading }] = useCreateTransaccionMutation()
    const [trigger, { data: balance }] = useLazyGetBalanceByIdQuery()

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)

        const monto = parseFloat(formData.get('monto') as string)

        monto && sendForm({ monto, cuenta_id: id, tipo })
    }

    const dispatch = useAppDispatch()
    // const state = useAppSelector(state => state.persistedReducer)

    useEffect(() => {
        if (data) trigger({id})
    }, [data])

    useEffect(() => {
      
        if(balance) {
            setOpenModal(false)
            dispatch(addTransaction({transaccion: data, balance})),
            Swal.fire({
                icon: "success",
                title: "Se realizó la transacción con éxito",
                showConfirmButton: false,
                timer: 1500
            })
        }
    }, [balance])
    
    return (
        <Fragment>
            <button onClick={() => setOpenModal(true)} type="button">
                <button className={clsx(`flex items-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`, classes)}>
                    {btnText}
                    <Icon color={iconColor} size={iconSize}/>
                </button>
            </button>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Realizar {tipo}</Modal.Header>
                <Modal.Body>
                    <TransaccionForm tipo={tipo} onSubmit={onSubmit} isError={isError} isLoading={isLoading} />
                </Modal.Body>
            </Modal>
        </Fragment >
    )
}

export default TransaccionModal