import { Cuenta } from "@/types/CuentaTypes";


function CuentasCard({
    cuentas,
}: {
    cuentas: Cuenta[]
}) {
    
    return cuentas.map(cuenta => (
    <div>
        {cuenta.nombre}
    </div>
    ))

}

export default CuentasCard