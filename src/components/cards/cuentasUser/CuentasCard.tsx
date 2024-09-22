import CuentaModal from "@/components/modals/CuentaModal";
import { useAppSelector } from "@/redux/hooks";
import { Cuenta } from "@/types/CuentaTypes";
import clsx from "clsx";
import { MouseEventHandler, useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";


function CuentasCard({
    cuentas,
    id,
    handleActive
}: {
    cuentas: Cuenta[],
    id: number,
    handleActive: (e: number) => void,
}) {

    const active_id = useAppSelector(state => state.persistedReducer.loggedUser.cuentas.find(cuenta => cuenta.active)?.id)

    return (
        <div className="flex flex-col w-1/2  bg-white p-8 rounded-md overflow-hidden relative">
            <div className="flex flex-1 justify-between p-2">
                <span className="font-semibold text-2xl text-green-800">Cuentas</span>
                <span className="flex items-center h-100 cursor-pointer">
                    <CuentaModal id={id} Icon={CiCirclePlus}/>
                </span>
            </div>
            <hr className="mb-4" />
            <div className="flex flex-col gap-3 h-full overflow-y-auto p-4 relative">
                {
                    cuentas.map((cuenta, idx) => (
                        <div key={idx} className={clsx(`flex justify-between shadow-lg rounded-md p-6 relative cursor-pointer 
                        transition duration-500 hover:scale-[1.02]`, active_id == cuenta.id && 'bg-emerald-200 ')} onClick={() => handleActive(cuenta.id)}>
                            <div className="flex flex-col gap-8 w-1/2">
                                <span className="font-semibold text-xl">
                                    {`${cuenta.nombre} - ${cuenta.numero_de_cuenta}`}
                                </span>
                                <span className={"italic"}>
                                    {`${cuenta.fecha_creacion}`}
                                </span>
                            </div>
                            <span className={clsx("flex justify-end items-center text-4xl w-1/2 italic", cuenta.monto < 0 ? 'text-red-500' : 'text-green-800')}>
                                ${cuenta.monto}
                            </span>
                        </div>
                    ))
                }
            </div>
        </div>
    )

}

export default CuentasCard