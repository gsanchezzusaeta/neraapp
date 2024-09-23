import { Cuenta } from '@/types/CuentaTypes'
import React from 'react'
import DataTable from 'react-data-table-component';
import { cuentaInfoCols } from './columns';
import { PiHandDepositFill, PiHandWithdrawFill } from "react-icons/pi";
import TransaccionModal from '@/components/modals/TransaccionModal';

const CuentaInfo = ({ cuenta }: { cuenta: Cuenta | undefined }) => {

    return !cuenta ?
        <div className='flex flex-col w-1/2  bg-white p-8 rounded-md overflow-hidden relative'>
            <div className='flex h-full bg-green-200 rounded-lg justify-center items-center'>
                <span className='text-2xl'>
                    Seleccione una cuenta para realizar acciones
                </span>
            </div>
        </div>
        :
        <div className="flex flex-col w-1/2  bg-white p-8 rounded-md overflow-hidden relative">
            <div className="flex justify-between p-2">
                <span className="font-semibold text-2xl text-green-800">{cuenta.nombre} - {cuenta.numero_de_cuenta}</span>
                <div className='flex flex-row gap-8'>
                    <TransaccionModal
                        id={cuenta.id}
                        tipo='Depósito'
                        classes='bg-green-700 hover:bg-green-800 text-white'
                        Icon={PiHandDepositFill}
                        btnText='Ingresar'
                        iconSize={30}
                        iconColor={'white'}
                    />
                    <TransaccionModal
                        id={cuenta.id}
                        tipo='Retiro'
                        classes='text-green-800 bg-white border-2 border-green-800'
                        Icon={PiHandWithdrawFill}
                        btnText='Retirar'
                        iconSize={30}
                        iconColor={'green-700'}
                    />
                </div>
            </div>
            <hr className="mb-4" />
            <DataTable
                columns={cuentaInfoCols}
                data={cuenta.transacciones}
                pagination={true}
                noDataComponent={
                    <div className='flex w-full h-full p-9 justify-center bg-slate-200 '>
                        No se encontraron transacciones
                    </div>
                } />
        </div>

}

export default CuentaInfo