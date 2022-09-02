import React, {useState} from 'react';
import {
    TableHead,
    TableRow,
    TablePagination,
    TableSortLabel,
    TableContainer
} from '@mui/material'
import {StyledPaper, StyledTable, StyledTableHeadCell} from "../../styles/Table.styled";





export default function useTable(records, headCells, filterFn, serviceRecords) {


    const pages = [5, 10, 25]
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(pages[page])
    const [order, setOrder] = useState()
    const [orderBy, setOrderBy] = useState()

    const TblContainer = props => (
        <TableContainer style={{overflowX: 'auto'}} component={StyledPaper}>
            <StyledTable>
                {props.children}
            </StyledTable>
        </TableContainer>
    )

    const TblHead = props => {

        const handleSortRequest = cellId => {
            const isAsc = orderBy === cellId && order === "asc";
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(cellId)
        }


        return (<TableHead>

            <TableRow>
                {
                    headCells.map(headCell => (
                        <StyledTableHeadCell
                            align='center'
                            key={headCell.id}
                            sortDirection={orderBy === headCell.id ? order : false}>
                            {headCell.disableSorting ? headCell.label :
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                    onClick={() => {
                                        handleSortRequest(headCell.id)
                                    }}>
                                    {headCell.label}
                                </TableSortLabel>
                            }
                        </StyledTableHeadCell>))
                }
            </TableRow>
        </TableHead>)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0);
    }

    const TblPagination = () => (<TablePagination
        component="div"
        page={page}
        rowsPerPageOptions={pages}
        rowsPerPage={rowsPerPage}
        count={records.length}
        onPageChange={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
    />)

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    const recordsAfterPagingAndSorting = () => {
        if (records) {
            return stableSort(filterFn.fn(records), getComparator(order, orderBy))
        } else
            return stableSort(filterFn.fn(serviceRecords), getComparator(order, orderBy))


        // .slice(page * rowsPerPage, (page + 1) * rowsPerPage)

    }

    return {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    }
}
