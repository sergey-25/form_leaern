import React, {useState} from 'react';
import * as servicesService from "../../services/servicesService";
import Notification from "../Notification";
import ServiceForm from "./ServiceForm";
import ServicesList from "./ServicesList";

import {AppBar, Box, Dialog, Fab, Toolbar, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";


const initialValues = {
    id: 0,
    date: new Date(),
    category: '',
    full_name: '',
    service: '',
    term: new Date(),
    priority: '',
    status: '',
    status_comment: '',
    contacts: [
        {
            name: '',
            phone_number: '',
            address: ''
        }
    ]
};

function ServicesComponent({
                               serviceRecords,
                               setServiceRecords,
                               filterFn,
                               setFilterFn,
                               notify,
                               setNotify,
                               confirmService,
                               setConfirmService
                           }) {


    const [openService, setOpenService] = React.useState(false);
    const [serviceRecordForEdit, setServiceRecordForEdit] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);


    const addOrEdit = (service, resetForm) => {
        if (service.id === 0)
            servicesService.insertService(service)
        else
            servicesService.updateService(service)
        resetForm()
        setServiceRecordForEdit(null)
        setOpenService(false)
        setServiceRecords(servicesService.getAllServices())
        setNotify({
            isOpen: true,
            message: 'Збережено',
            type: 'success'
        })
    };

    return (
        <>
            <Box>
                <Fab
                    style={{
                        backgroundColor: "#434746",
                        color: '#a4b9d6'
                    }}
                    aria-label="add"
                    onClick={() => {
                        setOpenService(true)
                        setServiceRecordForEdit(null);
                    }}
                    sx={{
                        position: 'fixed',
                        bottom: 20,
                        right: 20,
                    }}
                >
                    <AddIcon/>
                </Fab>
                <Dialog
                    open={openService}
                    maxWidth='lg'
                    fullWidth
                >
                    <AppBar
                        style={{backgroundColor: "#434746"}}
                        sx={{marginBottom: '10px', position: 'relative'}}>
                        <Toolbar>
                            {!serviceRecordForEdit ?
                                <Typography sx={{
                                    ml: 2, flex: 1, color: '#a4b9d6',
                                    fontWeight: 'bold',
                                    letterSpacing: '2px'
                                }}
                                            variant="h6"
                                            component="div">
                                    Нове замовлення
                                </Typography>
                                :
                                !isDisabled ?
                                    <Typography sx={{
                                        ml: 2, flex: 1, color: '#a4b9d6',
                                        fontWeight: 'bold',
                                        letterSpacing: '2px'
                                    }}
                                                variant="h6"
                                                component="div">
                                        Редагувати замовлення
                                    </Typography>
                                    :
                                    <Typography sx={{
                                        ml: 2, flex: 1, color: '#a4b9d6',
                                        fontWeight: 'bold',
                                        letterSpacing: '2px'
                                    }}
                                                variant="h6"
                                                component="div">
                                        Перегляд замовлення
                                    </Typography>
                            }
                        </Toolbar>
                    </AppBar>
                    <ServiceForm
                        setOpenService={setOpenService}
                        initialValues={initialValues}
                        serviceRecordForEdit={serviceRecordForEdit}
                        setServiceRecordForEdit={setServiceRecordForEdit}
                        addOrEdit={addOrEdit}
                        isDisabled={isDisabled}
                        setIsDisabled={setIsDisabled}
                    />
                </Dialog>
                <ServicesList
                    setOpenService={setOpenService}
                    serviceRecords={serviceRecords}
                    setServiceRecords={setServiceRecords}
                    serviceRecordForEdit={serviceRecordForEdit}
                    setServiceRecordForEdit={setServiceRecordForEdit}
                    setIsDisabled={setIsDisabled}
                    filterFn={filterFn}
                    setFilterFn={setFilterFn}
                    setNotify={setNotify}
                    confirmService={confirmService}
                    setConfirmService={setConfirmService}
                />
                <Notification
                    notify={notify}
                    setNotify={setNotify}
                />
            </Box>
        </>
    );
}

export default ServicesComponent;
