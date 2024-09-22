export const cuentaInfoCols = [
    {
        name: 'Tipo',
        selector: row => row.tipo,
    },
    {
        name: 'Fecha Realizada',
        selector: row => row.fecha_realizada,
    },
    {
        name: 'Monto',
        selector: row => `$ ${row.monto}`,
    },
];