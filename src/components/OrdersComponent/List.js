import React, {useState, useEffect} from 'react';
import {styled} from '@mui/material/styles';
import PropTypes from 'prop-types';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import useTable from "../hooks/useTable";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import {alpha, InputBase, Menu, MenuItem, Tooltip, AppBar, Toolbar, Box, Link, Button, CircularProgress} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import * as employeeService from "../../services/orderService";
import moment from 'moment';
import mySvg from '../../assets/images/img_nodatafound.svg'
import ConfirmDialog from "../ConfirmDialog";
import DeleteRecordButton from "../controls/DeleteRecordButton"


const headCells = [
    {id: '', label: '', disableSorting: true},
    {id: 'index', label: '№'},
    {id: 'address', label: 'Адреса'},
    {id: 'hireDate', label: 'Одержувач'},
    {id: 'comment', label: 'Коментар'},
    {id: 'date', label: 'Дата подачі'},
    {id: 'actions', label: 'Дії', disableSorting: true}
];


export const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

export const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    color: '#434746',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: '#434746',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


const StyledTableBodyCell = styled(TableCell)(({theme}) => ({
    border: '1px solid rgba(224, 224, 224, 1)',
    '&:first-of-type': {
        padding: 0
    },
    '&:last-of-type': {
        padding: 0
    }, borderCollapse: 'separate'
}));
const StyledDetailsTable = styled(Table)(({theme}) => ({
    border: '1px solid rgba(224, 224, 224, 1)',
    '& tbody tr td': {
        border: '1px solid rgba(224, 224, 224, 1)',
    }
}));
const StyledDetailsTableHeadCell = styled(TableCell)(({theme}) => ({
    border: '1px solid rgba(224, 224, 224, 1)',
    fontSize: '15px',
    fontWeight: '700',
    backgroundColor: theme.palette.action.hover,
}));
const StyledDetailsTableHeadRow = styled(TableRow)(({theme}) => ({
    border: '1px solid rgba(224, 224, 224, 1)',
}));
const StyledDetailsTableBodyCell = styled(TableCell)(({theme}) => ({
    border: '1px solid rgba(224, 224, 224, 1)'
}));


function Row({
                 row,
                 setRecords,
                 setRecordForEdit,
                 setOpenForm,
                 setNotify,
                 confirmDialog,
                 setConfirmDialog,
                 setIsDisabled
             }) {

    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = useState(false);


    const openMenu = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (e) => {
        e.stopPropagation()
        setAnchorEl(false);
    };

    const viewForm = (item) => {
        setIsDisabled(true)
        setRecordForEdit(item)
        setOpenForm(true)
    }

    const handleEdit = item => {
        setRecordForEdit(item)
        setOpenForm(true)
    };


    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        employeeService.deleteEmployee(id);
        setRecords(employeeService.getAllEmployees())
        setNotify({
            isOpen: true,
            message: 'Успішно видалили',
            type: 'error'
        })
    }
    return (
        <React.Fragment>
            <TableRow sx={{'& > *': {borderTop: 'unset'}}} hover={true}>
                <StyledTableBodyCell align='center'>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </StyledTableBodyCell>
                <StyledTableBodyCell align='center' component="th" scope="row" style={{width: 0}}>
                    {row.id}
                </StyledTableBodyCell>
                <StyledTableBodyCell>{row.address}</StyledTableBodyCell>
                <StyledTableBodyCell>{row.recipient}</StyledTableBodyCell>
                <StyledTableBodyCell>{row.comment}</StyledTableBodyCell>
                <StyledTableBodyCell
                    style={{width: '75px'}}>{moment(row.date).format("DD-MM-YYYY")}</StyledTableBodyCell>
                <StyledTableBodyCell align='center'>
                    <IconButton
                        style={{color: '#434746'}}
                        aria-label="more"
                        id="long-button"
                        aria-controls={openMenu ? 'long-menu' : undefined}
                        aria-expanded={openMenu ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                        color='primary'
                    >
                        <MoreVertIcon/>
                    </IconButton>
                    <Menu
                        id="long-menu"
                        MenuListProps={{
                            'aria-labelledby': 'long-button',
                        }}
                        anchorEl={anchorEl}
                        open={openMenu}
                        onClose={handleClose}
                        PaperProps={{
                            style: {
                                justifyContent: 'center',
                                width: '7ch',
                            },
                        }}
                    >
                        <MenuItem divider={true}
                                  style={{padding: '0px', justifyContent: 'center'}}>
                            <Tooltip
                                title='Переглянути замовлення'
                                placement="top">
                                <IconButton
                                    style={{color: '#434746'}}
                                    onClick={() => viewForm(row)}
                                >
                                    <VisibilityIcon style={{fontSize: 20}}/>
                                </IconButton>
                            </Tooltip>
                        </MenuItem>
                        <MenuItem divider={true}
                                  style={{padding: '0px', justifyContent: 'center',}}>
                            <Tooltip
                                title='Редагувати замовлення'
                                placement="left">
                                <IconButton
                                    style={{color: '#434746'}}
                                    onClick={() => {
                                        handleEdit(row)
                                    }}
                                >
                                    <EditIcon style={{fontSize: 20}}/>
                                </IconButton>
                            </Tooltip>
                        </MenuItem>
                        <MenuItem divider={true}
                                  style={{padding: '0px', justifyContent: 'center',}}>
                            <Tooltip
                                title='Видалити замовлення'
                                placement="left"
                            >
                                <IconButton
                                    color='error'
                                    onClick={() => {
                                        setConfirmDialog({
                                            isOpen: true,
                                            title: 'Справді видалити цей запис?',
                                            subTitle: "Ви не зможете скасувати цю операцію",
                                            onConfirm: () => {
                                                onDelete(row.id)
                                            }
                                        })
                                    }}>
                                    <DeleteForeverIcon style={{fontSize: 20}}/>
                                </IconButton>
                            </Tooltip>
                        </MenuItem>
                    </Menu>
                </StyledTableBodyCell>
            </TableRow>
            <TableRow>
                <TableCell style={{padding: '5px'}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>

                        <Typography variant="h6" gutterBottom component="div">
                            Деталі
                        </Typography>
                        <StyledDetailsTable>
                            <TableHead>
                                <StyledDetailsTableHeadRow>
                                    <StyledDetailsTableHeadCell>№</StyledDetailsTableHeadCell>
                                    <StyledDetailsTableHeadCell>Категорія</StyledDetailsTableHeadCell>
                                    <StyledDetailsTableHeadCell>Найменування</StyledDetailsTableHeadCell>
                                    <StyledDetailsTableHeadCell>Колір</StyledDetailsTableHeadCell>
                                    <StyledDetailsTableHeadCell>Розмір</StyledDetailsTableHeadCell>
                                    <StyledDetailsTableHeadCell>Кількість</StyledDetailsTableHeadCell>
                                    <StyledDetailsTableHeadCell>Посилання</StyledDetailsTableHeadCell>
                                    <StyledDetailsTableHeadCell>Коментар</StyledDetailsTableHeadCell>
                                    <StyledDetailsTableHeadCell>Термін</StyledDetailsTableHeadCell>
                                    <StyledDetailsTableHeadCell>Важливість</StyledDetailsTableHeadCell>
                                    {/*<TableCell align="right">Amount</TableCell>*/}
                                    {/*<TableCell align="right">Total price ($)</TableCell>*/}
                                </StyledDetailsTableHeadRow>
                            </TableHead>
                            <TableBody>
                                {row.details.map((historyRow, i) => (
                                    <TableRow key={i} hover={true}>
                                        <StyledDetailsTableBodyCell>
                                            {i + 1}
                                        </StyledDetailsTableBodyCell>
                                        <StyledDetailsTableBodyCell>
                                            {historyRow.category}
                                        </StyledDetailsTableBodyCell>
                                        <StyledDetailsTableBodyCell>{historyRow.full_name}</StyledDetailsTableBodyCell>
                                        <StyledDetailsTableBodyCell>{historyRow.color}</StyledDetailsTableBodyCell>
                                        <StyledDetailsTableBodyCell>{historyRow.size}</StyledDetailsTableBodyCell>
                                        <StyledDetailsTableBodyCell>{historyRow.amount}</StyledDetailsTableBodyCell>
                                        <StyledDetailsTableBodyCell>
                                            <Link
                                                href={historyRow.link}
                                                rel="noreferrer"
                                                target="_blank"
                                                underline="hover"
                                            >
                                                {historyRow.link}
                                            </Link>
                                        </StyledDetailsTableBodyCell>
                                        <StyledDetailsTableBodyCell>{historyRow.comment}</StyledDetailsTableBodyCell>
                                        <StyledDetailsTableBodyCell>{moment(historyRow.term).format("DD-MM-YYYY")}</StyledDetailsTableBodyCell>
                                        <StyledDetailsTableBodyCell>{historyRow.priority}</StyledDetailsTableBodyCell>
                                        {/*<TableCell align="right">*/}
                                        {/*    {Math.round(historyRow.amount * row.id * 100) / 100}*/}
                                        {/*</TableCell>*/}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </StyledDetailsTable>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

// Row.propTypes = {
//     row: PropTypes.shape({
//         calories: PropTypes.number.isRequired,
//         carbs: PropTypes.number.isRequired,
//         fat: PropTypes.number.isRequired,
//         history: PropTypes.arrayOf(
//             PropTypes.shape({
//                 amount: PropTypes.number.isRequired,
//                 customerId: PropTypes.string.isRequired,
//                 date: PropTypes.string.isRequired,
//             }),
//         ).isRequired,
//         name: PropTypes.string.isRequired,
//         price: PropTypes.number.isRequired,
//         protein: PropTypes.number.isRequired,
//     }).isRequired,
// };


export default function CollapsibleTable({
                                             isLoading,
                                             setIsLoading,
                                             setOpenForm,
                                             // setOpenService,
                                             setRecordForEdit,
                                             setIsDisabled,
                                             records,
                                             setRecords,
                                             setNotify,
                                             confirmDialog,
                                             setConfirmDialog, filterFn, setFilterFn
                                         }) {
    // const [filterFn, setFilterFn] = useState({
    //     fn: items => {
    //         return items;
    //     }
    // })


    const {
        TblContainer,
        TblHead,
        // TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);


    // const handleSearch = e => {
    //     let target = e.target;
    //     setFilterFn({
    //         fn: items => {
    //             if (target.value === "")
    //                 return items;
    //             else
    //                 return items.filter(x => x.address.toLowerCase().includes(target.value) || x.id.toString().toLowerCase().includes(target.value))
    //         }
    //     })
    // };

    useEffect(() => {
        if (isLoading) {
           const timer = setTimeout(() => {
                setIsLoading(false)
            }, 1500);
            return () => {
                clearTimeout(timer);
            };
        }

    }, [!isLoading]);

    return (
        <Box>
            {isLoading ? <CircularProgress />
            :
          <>
              {/*    <Toolbar style={{backgroundColor: "#a4b9d6", minHeight: 0}}>*/}
              {/*        <IconButton*/}
              {/*            size="large"*/}
              {/*            edge="start"*/}
              {/*            aria-label="open drawer"*/}
              {/*            sx={{mr: 2}}*/}
              {/*        >*/}
              {/*            <MenuIcon/>*/}
              {/*        </IconButton>*/}
              {/*        <Tooltip title="Фільтр">*/}
              {/*            <IconButton>*/}
              {/*                <FilterListIcon style={{fontSize: 30}}/>*/}
              {/*            </IconButton>*/}
              {/*        </Tooltip>*/}
              {/*        /!*<Button onClick={()=>setOpenService(true)}>Послуги</Button>*!/*/}
              {/*        <Typography*/}
              {/*            variant="h6"*/}
              {/*            noWrap*/}
              {/*            component="div"*/}
              {/*            sx={{*/}
              {/*                flexGrow: 1, display: {*/}
              {/*                    xs: 'none',*/}
              {/*                    sm: 'block',*/}
              {/*                    color: '#434746',*/}
              {/*                    letterSpacing: '2px',*/}
              {/*                    fontWeight: 'bold'*/}
              {/*                }*/}
              {/*            }}*/}
              {/*        >*/}
              {/*            Перелік замовлень*/}
              {/*        </Typography>*/}
              {/*        /!*<Search onChange={handleSearch}>*!/*/}
              {/*        /!*    <SearchIconWrapper>*!/*/}
              {/*        /!*        <SearchIcon/>*!/*/}
              {/*        /!*    </SearchIconWrapper>*!/*/}
              {/*        /!*    <StyledInputBase*!/*/}
              {/*        /!*        placeholder="Пошук…"*!/*/}
              {/*        /!*        inputProps={{'aria-label': 'search'}}*!/*/}
              {/*        /!*    />*!/*/}
              {/*        /!*</Search>*!/*/}
              {/*    </Toolbar>*/}
              {/*</AppBar>*/}
              <Box m={2}>
                  <TblContainer component={Paper} style={{marginBottom: '30px'}} gutterBottom>

                      {/*<TableHead>*/}
                      {/*    <StyledDetailsTableHeadRow>*/}
                      {/*        <StyledDetailsTableHeadCell>№</StyledDetailsTableHeadCell>*/}
                      {/*        <StyledDetailsTableHeadCell>Категорія</StyledDetailsTableHeadCell>*/}
                      {/*        {records.map(f=> [...f.recipient].length) > 0 ?  <StyledDetailsTableHeadCell>Послуга</StyledDetailsTableHeadCell>*/}
                      {/*            : null}*/}
                      {/*    </StyledDetailsTableHeadRow>*/}
                      {/*</TableHead>*/}
                      <TblHead/>

                      {records.length ? <TableBody>
                              {recordsAfterPagingAndSorting().map((row, i) => (

                                  <Row key={i}
                                       row={row}
                                       setOpenForm={setOpenForm}
                                      // setOpenService={setOpenService}
                                       setRecords={setRecords}
                                       setRecordForEdit={setRecordForEdit}
                                       setIsDisabled={setIsDisabled}
                                       setNotify={setNotify}
                                       confirmDialog={confirmDialog}
                                       setConfirmDialog={setConfirmDialog}

                                  />

                              ))}
                          </TableBody>
                          : null
                      }
                  </TblContainer>
                  {!records.length ?
                      <div style={{
                          display: 'block',
                          padding: '100px'
                      }}>
                          <img
                              style={{widht: '301px', height: '227px'}}
                              src={mySvg}
                              alt={'empty list'}/>
                      </div>
                      : null}

              </Box>
              <ConfirmDialog
                  confirmDialog={confirmDialog}
                  setConfirmDialog={setConfirmDialog}
              />
          </>
            }

        </Box>
    );
}
