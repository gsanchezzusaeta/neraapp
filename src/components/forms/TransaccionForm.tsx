"use client";

import React, { FormEvent } from 'react'
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';

function TransaccionForm({
    
    onSubmit,
    isLoading,
    isError,
    tipo,
    setOpenModal
}: {
    onSubmit: (e: FormEvent<HTMLFormElement>) => void,
    isLoading: boolean,
    isError: boolean,
    tipo: string,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}) {

    return (
        <form className="rounded px-2 mb-4" onSubmit={onSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="monto">
                    Monto
                </label>
                <input required className="shadow appearance-none border rounded w-full py-2
                             px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="monto"
                    name='monto'
                    type="number"
                    step=".01"
                    placeholder="Monto" />
                {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
            </div>
            <div className="flex flex-row items-center justify-between gap-3">
                <button onClick={() => setOpenModal(false)} className="w-full text-green-800 bg-white border-2 border-green-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Cancelar
                </button>
                <button type="submit" className="w-full  bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    {isLoading ?
                        <LoadingSpinner />
                        : 'Confirmar'}
                </button>
            </div>
        </form>
    )
}

export default TransaccionForm