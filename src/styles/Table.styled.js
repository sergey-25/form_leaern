import {styled} from '@mui/material/styles';
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import {Paper} from "@mui/material";


export const StyledTableBodyCell = styled(TableCell)(({theme}) => ({
    border: '1px solid rgba(224, 224, 224, 1)',
    padding:'5px',
    '&:first-of-type': {
        padding: 0
    },
    '&:last-of-type': {
        padding: 0
    }, borderCollapse: 'separate'
}));

export const StyledDetailsTable = styled(Table)(({theme}) => ({
    border: '1px solid rgba(224, 224, 224, 1)',
    '& tbody tr td': {
        border: '1px solid rgba(224, 224, 224, 1)',
    }
}));

export const StyledDetailsTableHeadCell = styled(TableCell)(({theme}) => ({
    border: '1px solid rgba(224, 224, 224, 1)',
    fontSize: '15px',
    fontWeight: '700',
    backgroundColor: theme.palette.action.hover,
}));

export const StyledDetailsTableHeadRow = styled(TableRow)(({theme}) => ({
    border: '1px solid rgba(224, 224, 224, 1)',
}));

export const StyledDetailsTableBodyCell = styled(TableCell)(({theme}) => ({
    border: '1px solid rgba(224, 224, 224, 1)',
    wordBreak: 'break-all'
}));

export const StyledPaper = styled(Paper)(({theme}) => ({
    border: '2px solid rgba(224, 224, 224, 1)',
}));


export const StyledTable = styled(Table)(({theme}) => ({
    borderCollapse: 'collapse'
}));

export const StyledTableHeadCell = styled(TableCell)(({theme}) => ({
    fontSize: '15px',
    fontWeight: '700',
    padding: '10px',
    borderLeft: '1px solid rgba(224, 224, 224, 1)',
    borderRight: '1px solid rgba(224, 224, 224, 1)',
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
    backgroundColor: theme.palette.action.hover,

    '&:first-of-type': {
        padding: 0
    },
    '&:last-of-type': {
        padding: 0
    },
}));
