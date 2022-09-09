import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import useTable from "../hooks/useTable";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
    Menu, MenuItem, Tooltip, Box, Link, Paper, Typography, TableRow,
    TableHead, TableCell, TableBody, Collapse, CircularProgress, Grid, Chip
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import * as employeeService from "../../services/orderService";
import moment from 'moment';
import highPriorityIcon from '../../assets/svg/high-priority_1.svg'
import mediumPriorityIcon from '../../assets/svg/medium-priority_1.svg'
import lowPriorityIcon from '../../assets/svg/low-priority_2.svg'
// import mySvg from '../../assets/images/img_nodatafound.svg'
import ConfirmDialog from "../ConfirmDialog";
import {
    StyledDetailsTable, StyledDetailsTableBodyCell,
    StyledDetailsTableHeadCell,
    StyledDetailsTableHeadRow,
    StyledTableBodyCell
} from "../../styles/Table.styled";


const headCells = [
    {id: '', label: '', disableSorting: true},
    {id: 'index', label: '№'},
    {id: 'address', label: 'Адреса'},
    {id: 'recipient', label: 'Одержувач'},
    {id: 'comment', label: 'Коментар'},
    {id: 'date', label: 'Дата подачі'},
    {id: 'status', label: 'Статус'},
    {id: 'actions', label: 'Дії', disableSorting: true}
];


function Row({
                 row,
                 setRecords,
                 setRecordForEdit,
                 setOpenForm,
                 setNotify,
                 confirmOrder,
                 setConfirmOrder,
                 setIsDisabled
             }) {

    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = useState(false);
    const [isStatus, setIsStatus] = useState({})

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
    };

    const handleEdit = item => {
        setRecordForEdit(item)
        setOpenForm(true)
    };


    const onDelete = id => {
        setConfirmOrder({
            ...confirmOrder,
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
                    {/*<p>{row.details.length}</p>*/}
                </StyledTableBodyCell>
                <StyledTableBodyCell align='center' component="th" scope="row" style={{width: 0}}>
                    {row.id}
                </StyledTableBodyCell>
                <StyledTableBodyCell>{row.address}</StyledTableBodyCell>
                <StyledTableBodyCell>{row.recipient}</StyledTableBodyCell>
                <StyledTableBodyCell>{row.comment}</StyledTableBodyCell>
                <StyledTableBodyCell
                    style={{width: '75px'}}>
                    {moment(row.date).format("DD-MM-YYYY")}
                </StyledTableBodyCell>
                <StyledTableBodyCell
                    width='2%'
                    align='center'>
                    <Chip
                        sx={{fontSize: '10px', fontWeight: 'bolder'}}
                        label="Нове "
                        color="primary"
                        size="small"/>
                </StyledTableBodyCell>
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
                                        setConfirmOrder({
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
                                </StyledDetailsTableHeadRow>
                            </TableHead>
                            <TableBody>
                                {row.details.map((detail, i) => (
                                    <TableRow key={i} hover={true}>
                                        <StyledDetailsTableBodyCell>
                                            {i + 1}
                                        </StyledDetailsTableBodyCell>
                                        <StyledDetailsTableBodyCell>
                                            {detail.category}
                                        </StyledDetailsTableBodyCell>
                                        <StyledDetailsTableBodyCell>
                                            {detail.full_name}
                                        </StyledDetailsTableBodyCell>
                                        <StyledDetailsTableBodyCell>
                                            {detail.color}
                                        </StyledDetailsTableBodyCell>
                                        <StyledDetailsTableBodyCell>
                                            {detail.size}
                                        </StyledDetailsTableBodyCell>
                                        <StyledDetailsTableBodyCell>
                                            {detail.amount}
                                        </StyledDetailsTableBodyCell>
                                        <StyledDetailsTableBodyCell>
                                            <Link
                                                href={detail.link}
                                                rel="noreferrer"
                                                target="_blank"
                                                underline="hover"
                                            >
                                                {detail.link}
                                            </Link>
                                        </StyledDetailsTableBodyCell>
                                        <StyledDetailsTableBodyCell>
                                            {detail.comment}
                                        </StyledDetailsTableBodyCell>
                                        <StyledDetailsTableBodyCell>
                                            {moment(detail.term).format("DD-MM-YYYY")}
                                        </StyledDetailsTableBodyCell>
                                        <StyledDetailsTableBodyCell>
                                            <Grid container>
                                                <Grid item>
                                                    <p>{detail.priority}</p>
                                                </Grid>
                                                <Grid item>
                                                    {detail.priority === 'Висока' ?
                                                        <img
                                                            style={{width: '24px', height: '24px'}}
                                                            src={highPriorityIcon}
                                                            alt={'high priority'}/>
                                                        : detail.priority === 'Помірна' ?
                                                            <img
                                                                style={{width: '24px', height: '24px'}}
                                                                src={mediumPriorityIcon}
                                                                alt={'medium priority'}/>
                                                            : detail.priority === 'Низька' ?
                                                                <img
                                                                    style={{width: '24px', height: '24px'}}
                                                                    src={lowPriorityIcon}
                                                                    alt={'low priority'}/> : null
                                                    }
                                                </Grid>
                                            </Grid>
                                        </StyledDetailsTableBodyCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </StyledDetailsTable>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};

export default function OrderList({
                                      handlePrint,
                                      isLoading,
                                      setIsLoading,
                                      setOpenForm,
                                      setRecordForEdit,
                                      setIsDisabled,
                                      records,
                                      setRecords,
                                      setNotify,
                                      confirmOrder,
                                      setConfirmOrder,
                                      filterFn
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
            {isLoading ? <CircularProgress/>
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
                            <TblHead/>

                            {records.length ?
                                <TableBody>
                                    {recordsAfterPagingAndSorting().map((row, i) => (
                                        <>
                                            {handlePrint(row)}
                                            <Row key={i}
                                                 row={row}
                                                 setOpenForm={setOpenForm}
                                                // setOpenService={setOpenService}
                                                 setRecords={setRecords}
                                                 setRecordForEdit={setRecordForEdit}
                                                 setIsDisabled={setIsDisabled}
                                                 setNotify={setNotify}
                                                 confirmOrder={confirmOrder}
                                                 setConfirmOrder={setConfirmOrder}

                                            />
                                        </>

                                    ))}
                                </TableBody>
                                : null
                            }
                        </TblContainer>
                        {/*{!records.length ?*/}
                        {/*    <div style={{*/}
                        {/*        display: 'block',*/}
                        {/*        padding: '100px'*/}
                        {/*    }}>*/}
                        {/*        <img*/}
                        {/*            style={{width: '301px', height: '227px'}}*/}
                        {/*            src={mySvg}*/}
                        {/*            alt={'empty list'}/>*/}
                        {/*    </div>*/}
                        {/*    : null}*/}

                    </Box>
                    <ConfirmDialog
                        confirmDialog={confirmOrder}
                        setConfirmDialog={setConfirmOrder}
                    />
                </>
            }

        </Box>
    );
}
