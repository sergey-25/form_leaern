import React, {useRef, useState} from 'react';
import * as employeeService from "../../services/orderService";
import OrderForm from "./orderForm/OrderForm";
import OrderList from "./OrderList";
import Notification from "../Notification";
import {AppBar, Box, Dialog, Fab, Slide, Toolbar, Typography, Tooltip, IconButton} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import {useReactToPrint} from "react-to-print";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {useForm} from "../hooks/useForm";
import FinalDocument from "./toPdf/FinalDocument";


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


function OrdersComponent({
                             records,
                             setRecords,
                             filterFn,
                             setFilterFn,
                             notify,
                             setNotify,
                             confirmOrder,
                             setConfirmOrder
                         }) {

    const [openForm, setOpenForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isPrint, setIsPrint]= useState({})


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
            message: '??????????????????',
            type: 'success'
        })
    };
    const handlePrint = (item, e)=>{
        setIsPrint(item)
        console.log(item)
    }



    const componentRef = useRef();
    const handlePrinte = useReactToPrint({
        content: () => componentRef.current
    });
    const columns = [
        {header: '??????????????????', field: 'category'},
        {header: '????????????????????????', field: 'full_name'},
        {header: '??????????', field: 'color'},
        {header: '????????????', field: 'size'},
        {header: '??????????????????', field: 'amount'},
        {header: '??????????????????', field: 'link'},
        {header: '????????????????', field: 'comment'},
        {header: '????????????', field: 'term'},
        {header: '????????????????????', field: 'priority'},
        // {title:'', field:''}
    ];
    const {
        values
    } = useForm();

    const char = JSON.stringify(columns.map((col) => (col.header.toString())))
    const downloadPdf = () => {
        const doc = new jsPDF('p', 'pt',)

        autoTable(doc, ({

            // columnStyles: { europe: { align: 'center' } }, // European countries centered
            // body: [
            //     { europe: 'Sweden', america: 'Canada', asia: 'China' },
            //     { europe: 'Norway', america: 'Mexico', asia: 'Japan' },
            // ],
            head: columns.map((col) => (col.header.toString('utf8')))
            // columns: [
            //     { header: '????????????', dataKey: 'europe' },
            //     { header: 'Asia', dataKey: 'asia' },
            //     { header: 'America', dataKey: 'america' },
            // ],

        }))
        doc.save('cxcxz')
    }

    return (
        <div>
            <button onClick={(item)=>handlePrint(item)}>print</button>
            <Box>
                <Tooltip title='???????????????? ????????????'>
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
                                    ???????? ????????????????????
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
                                        ???????????????????? ????????????????????
                                    </Typography>
                                    :
                                    <>
                                        <Typography sx={{
                                            ml: 2, flex: 1, color: '#a4b9d6',
                                            fontWeight: 'bold',
                                            letterSpacing: '2px'
                                        }}
                                                    variant="h6"
                                                    component="div">
                                            ???????????????? ????????????????????
                                        </Typography>

                                        <IconButton onClick={() => downloadPdf()}>
                                            <PrintOutlinedIcon style={{color: '#a4b9d6'}}/>
                                        </IconButton>
                                    </>
                            }

                        </Toolbar>
                    </AppBar>
                    <OrderForm
                        componentRef={componentRef}
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
                <FinalDocument records={records}
                />
                <OrderList
                    handlePrint={handlePrint}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    setOpenForm={setOpenForm}
                    recordForEdit={recordForEdit}
                    setRecordForEdit={setRecordForEdit}
                    setIsDisabled={setIsDisabled}
                    records={records}
                    setRecords={setRecords}
                    confirmOrder={confirmOrder}
                    setConfirmOrder={setConfirmOrder}
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
