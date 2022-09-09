import React, {useState} from 'react';
import useTable from "../hooks/useTable";
import * as servicesService from "../../services/servicesService";
import {Box, Divider, Grid, Menu, MenuItem, Paper, TableBody, TableRow, Tooltip} from "@mui/material";
import {StyledTableBodyCell} from "../../styles/Table.styled";
import moment from "moment/moment";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import highPriorityIcon from "../../assets/svg/high-priority_1.svg";
import mediumPriorityIcon from "../../assets/svg/medium-priority_1.svg";
import lowPriorityIcon from "../../assets/svg/low-priority_2.svg";
import ConfirmDialog from "../ConfirmDialog";


const headCells = [
    // {id: '', label: '', disableSorting: true},
    {id: 'index', label: '№'},
    {id: 'date', label: 'Дата подачі'},
    {id: 'full_name', label: 'Найменування'},
    {id: 'service', label: 'Опис послуги'},
    {id: 'term', label: 'Термін'},
    {id: 'priority', label: 'Важливість'},
    {id: 'contact', label: 'Контакти'},
    {id: 'status', label: 'Статус'},
    {id: 'status_comment', label: 'Коментар до статусу'},
    {id: 'actions', label: 'Дії', disableSorting: true}
];

function Row({
                 row,
                 setOpenService,
                 setServiceRecords,
                 setServiceRecordForEdit,
                 setIsDisabled,
                 setNotify,
                 setConfirmService,
                 confirmService
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
        setServiceRecordForEdit(item)
        setOpenService(true)
    };

    const handleEdit = (item) => {
        setServiceRecordForEdit(item)
        setOpenService(true)
    };


    const onDelete = id => {
        setConfirmService({
            ...confirmService,
            isOpen: false
        })
        servicesService.deleteService(id);
        setServiceRecords(servicesService.getAllServices())
        setNotify({
            isOpen: true,
            message: 'Успішно видалили',
            type: 'error'
        })
    };

    return (
        <React.Fragment>
            <TableRow sx={{'& > *': {borderTop: 'unset'}}} hover={true}>
                <StyledTableBodyCell
                    align='center'
                    component="th"
                    scope="row"
                    style={{width: 0}}
                >
                    {row.id}
                </StyledTableBodyCell>
                <StyledTableBodyCell
                    style={{width: '75px'}}
                >
                    {moment(row.date).format("DD-MM-YYYY")}
                </StyledTableBodyCell>
                <StyledTableBodyCell>{row.full_name}</StyledTableBodyCell>
                <StyledTableBodyCell>{row.service}</StyledTableBodyCell>
                <StyledTableBodyCell>
                    До {moment(row.term).format("DD-MM-YYYY")}
                </StyledTableBodyCell>
                <StyledTableBodyCell align='center'>
                    {row.priority === 'Висока' ?
                        <img
                            // className='circle alertPulse-css'
                            style={{width: '24px', height: '24px'}}
                            src={highPriorityIcon}
                            alt={'high priority'}/>
                        : row.priority === 'Помірна' ?
                            <img
                                style={{width: '24px', height: '24px'}}
                                src={mediumPriorityIcon}
                                alt={'medium priority'}/>
                            : row.priority === 'Низька' ?
                                <img
                                    style={{width: '24px', height: '24px'}}
                                    src={lowPriorityIcon}
                                    alt={'low priority'}/> : null
                    }
                </StyledTableBodyCell>

                {row.contacts.map((contact, j) => (
                    <StyledTableBodyCell key={j}>
                        <p> {contact.name}</p>
                        {contact.name && <Divider/>}
                        <p>{contact.phone_number}</p>
                        {contact.phone_number && <Divider/>}
                        <p>{contact.address}</p>
                    </StyledTableBodyCell>
                ))}

                <StyledTableBodyCell>{row.status}</StyledTableBodyCell>
                <StyledTableBodyCell>{row.status_comment}</StyledTableBodyCell>
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
                                        setConfirmService({
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
        </React.Fragment>
    )
}


function ServicesList({
                          setOpenService,
                          serviceRecords,
                          setServiceRecords,
                          serviceRecordForEdit,
                          setServiceRecordForEdit,
                          setIsDisabled,
                          setNotify,
                          setConfirmService,
                          confirmService,
                          filterFn
                      }) {

    const {
        TblContainer,
        TblHead,
        // TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(serviceRecords, headCells, filterFn);
    return (
        <Box>
            {/*<Box className='pulse'><PriorityHighRoundedIcon style={{color:'#fff'}}/></Box>*/}
            <Box m={2}>
                <TblContainer component={Paper} style={{marginBottom: '30px'}} gutterBottom>
                    <TblHead/>
                    {serviceRecords.length ?
                        <TableBody>
                            {recordsAfterPagingAndSorting().map((row, i) => (
                                <Row key={i}
                                     row={row}
                                     setOpenService={setOpenService}
                                     setServiceRecords={setServiceRecords}
                                     setServiceRecordForEdit={setServiceRecordForEdit}
                                     setIsDisabled={setIsDisabled}
                                     setNotify={setNotify}
                                     confirmService={confirmService}
                                     setConfirmService={setConfirmService}

                                />

                            ))}
                        </TableBody>
                        : null
                    }
                </TblContainer>
            </Box>
            <ConfirmDialog
                confirmDialog={confirmService}
                setConfirmDialog={setConfirmService}
            />
        </Box>
    );
}

export default ServicesList;
