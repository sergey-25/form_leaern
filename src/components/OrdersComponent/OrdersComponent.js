import React, {useState} from 'react';
import * as employeeService from "../../services/orderService";
import OrderForm from "./orderForm/OrderForm";
import List from "./List";
import Notification from "../Notification";
import {AppBar, Box, Dialog, Fab, Slide, Toolbar, Typography, Tooltip, IconButton} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import {styled} from '@mui/material/styles';
import * as servicesService from "../../services/servicesService";
import ServiceForm from "../ServicesComponent/ServiceForm";


const initialValues = {
    id: 0,
    date: new Date(),
    address: '',
    recipient: '',
    comment: '',
    details: [
        {
            category: '',
            full_name: '',
            color: '',
            size: '',
            amount: '',
            link: '',
            comment: '',
            term: new Date(),
            priority: '',
            status: '',
            status_comment: '',
            // contacts: [""]
        }
    ],
    services: {
        contact: '',
        category: 'fdsfdsfdsf',
        full_name: '',
        service: '',
        term: new Date(),
        priority: '',
        status: '',
        status_comment: ''
    }
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return (<Slide direction="up" ref={ref} {...props} />);
});
// export const StyledTypography= styled(Typography)(({theme}) => ({
//     variant="h6"
//     component="div"
// }));


function OrdersComponent({records, setRecords, filterFn, setFilterFn}) {

    const [openForm, setOpenForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    // const [openService, setOpenService] = React.useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);
    const [notify, setNotify] = useState({isOpen: false, message: '', type: ''});
    const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subTitle: ''});


    const addOrEdit = (order, resetForm) => {
        if (order.id === 0)
            employeeService.insertEmployee(order)
        else
            employeeService.updateEmployee(order)
        resetForm()
        setRecordForEdit(null)
        setOpenForm(false)
        setRecords(employeeService.getAllEmployees())
        setNotify({
            isOpen: true,
            message: 'Збережено',
            type: 'success'
        })
    };

    return (
        <div>
            <Box>
                <Tooltip title='Створити заявку'>
                    <Fab
                        style={{
                            backgroundColor: "#434746",
                            color: '#a4b9d6'
                        }}
                        aria-label="add"
                        onClick={() => {
                            setOpenForm(true)
                            setRecordForEdit(null);
                        }}
                        sx={{
                            position: 'fixed',
                            bottom: 20,
                            right: 20,
                        }}
                    >
                        <AddIcon style={{fontSize: '33px'}}/>
                    </Fab>
                </Tooltip>
                <Dialog
                    open={openForm}
                    fullScreen
                    TransitionComponent={Transition}
                >
                    <AppBar
                        style={{backgroundColor: "#434746"}}
                        sx={{marginBottom: '10px', position: 'relative'}}>
                        <Toolbar>
                            {!recordForEdit ?
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
                            <IconButton>
                                <PrintOutlinedIcon style={{color: '#a4b9d6'}}/>
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <OrderForm
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                        setOpenForm={setOpenForm}
                        initialValues={initialValues}
                        recordForEdit={recordForEdit}
                        isDisabled={isDisabled}
                        setIsDisabled={setIsDisabled}
                        setRecordForEdit={setRecordForEdit}
                        addOrEdit={addOrEdit}
                    />
                </Dialog>
                {/*<Dialog*/}
                {/*open={openService}*/}
                {/*fullScreen*/}
                {/*TransitionComponent={Transition}*/}
                {/*>*/}
                {/*    <ServiceForm setOpenService={setOpenService}/>*/}
                {/*</Dialog>*/}
                <List
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    setOpenForm={setOpenForm}
                    recordForEdit={recordForEdit}
                    setRecordForEdit={setRecordForEdit}
                    setIsDisabled={setIsDisabled}
                    records={records}
                    setRecords={setRecords}
                    confirmDialog={confirmDialog}
                    setConfirmDialog={setConfirmDialog}
                    notify={notify}
                    setNotify={setNotify}
                    filterFn={filterFn}
                    setFilterFn={setFilterFn}
                />
                <Notification
                    notify={notify}
                    setNotify={setNotify}
                />
            </Box>
        </div>
    );
}

export default OrdersComponent;
