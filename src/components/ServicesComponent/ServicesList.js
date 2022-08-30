import React from 'react';
import useTable from "../hooks/useTable";



const headCells = [
    {id: '', label: '', disableSorting: true},
    {id: 'index', label: '№'},
    {id: 'address', label: 'Адреса'},
    {id: 'hireDate', label: 'Одержувач'},
    {id: 'comment', label: 'Коментар'},
    {id: 'date', label: 'Дата подачі'},
    {id: 'actions', label: 'Дії', disableSorting: true}
];

function ServicesList({serviceRecords, setServiceRecords}) {

    const {
        TblContainer,
        TblHead,
        // TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(serviceRecords);
    return (
        <div>fsdfdfdsf</div>
    );
}

export default ServicesList;
