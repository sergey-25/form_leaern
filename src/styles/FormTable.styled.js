import {styled} from '@mui/material/styles';
import Table from "@mui/material/Table";
import {Paper, TableCell, TableHead, TableRow} from "@mui/material";


export const StyledTable = styled(Table)(({theme}) => ({
    padding: '0 10px',
    margin: 0,
    // borderRadius: '10px',
    // display: 'block',
    // border: '2px solid gray',
    borderCollapse: 'collapse',
    '& tbody tr td': {
        borderBottom: 'none'
    }
}));

export const StyledTableHead = styled(TableHead)(({theme}) => ({
    padding: '10px',
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    }
}));

export const StyledTableRow = styled(TableRow)(({theme}) => ({
    borderTop: '1px solid gray',

    '&:nth-of-type(even)': {
        backgroundColor: theme.palette.action.hover,
    }
}));

export const StyledTableCellHead = styled(TableCell)(({theme}) => ({
    fontSize: '15px',
    fontWeight: '700',
    borderBottom: '1px solid gray',
    borderRight: '1px solid gray',
    borderLeft: '1px solid gray',
    '&:first-of-type': {
        borderLeft: 0,
    },
    '&:last-of-type': {
        borderRight: 0,
        width: '40px'
    },

}));

export const StyledTableCellBody = styled(TableCell)(({theme}) => ({
    borderRight: '1px solid gray',
    padding: 0,
    '&:last-of-type': {
        borderRight: 0,
    }
}));
export const StyledFormPaper = styled(Paper)(({theme}) => ({
    border: '2px solid rgba(224, 224, 224, 1)',
    borderRadius:'10px'
}));