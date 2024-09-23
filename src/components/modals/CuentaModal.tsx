import React, { FormEvent, Fragment, useEffect } from 'react'
import { IconType } from 'react-icons'
import { Modal } from "flowbite-react";
import { useState } from "react";
import CuentaForm from '../forms/CuentaForm';
import { useCreateCuentaMutation } from '@/redux/api/cuentaApi';
import { useLazyGetUserByIdQuery } from '@/redux/api/userApi';
import { setLoggedUser } from '@/redux/features/userSlice';
import { useAppDispatch } from '@/redux/hooks';
import Swal from 'sweetalert2'


const CuentaModal = ({ Icon, id }: { Icon: IconType, id: number }) => {

    const [openModal, setOpenModal] = useState(false);

    const [sendForm, { data, isError, isLoading }] = useCreateCuentaMutation()

    const [trigger, { data: user }] = useLazyGetUserByIdQuery()

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const nombre = formData.get('nombre') as string
        const numero_de_cuenta = parseInt(formData.get('numero_de_cuenta') as string)
        const monto = parseInt(formData.get('monto') as string)
        nombre && numero_de_cuenta && monto && sendForm({ nombre, numero_de_cuenta, monto, cliente_id: id })
    }

    useEffect(() => {
        if (data) trigger({ id })
    }, [data])

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (user) {
            setOpenModal(false)
            dispatch(setLoggedUser({ ...user, auth: true }),
                Swal.fire({
                    icon: "success",
                    title: "Se agregó la cuenta con éxito",
                    showConfirmButton: false,
                    timer: 1500
                })
            )
        }
    }, [user])

    useEffect(() => {
      
        if(isError) {
            Swal.fire({
                icon: "success",
                title: "Ups... Hubo un problema!",
                text: "No se pudo agregar la cuenta de forma correcta",
                showConfirmButton: false,
                timer: 1500
            })
        }
      
    }, [isError])
    

    return (
        <Fragment>
            <button onClick={() => setOpenModal(true)} type="button">
                <Icon size={30} color="green" />
            </button>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Agregar cuenta</Modal.Header>
                <Modal.Body>
                    <CuentaForm setOpenModal={setOpenModal} onSubmit={onSubmit} isError={isError} isLoading={isLoading} />
                </Modal.Body>
            </Modal>
        </Fragment >
    )
}

export default CuentaModal