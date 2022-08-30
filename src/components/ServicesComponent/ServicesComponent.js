import React from 'react';
import {AppBar, Box, Dialog, Fab, Toolbar, Typography} from "@mui/material";
import ServiceForm from "./ServiceForm";
import ServicesList from "./ServicesList";
import AddIcon from "@mui/icons-material/Add";


const initialValues = {
    id: 0,
    date: '',
    contact: '',
    category: '',
    full_name: '',
    service: '',
    term: '',
    priority: '',
    status: '',
    status_comment: ''
};

function ServicesComponent({serviceRecords, setServiceRecords}) {
    const [openService, setOpenService] = React.useState(false);
    // const [serviceRecords, setServiceRecords] = React.useState(false);


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
                        // setRecordForEdit(null);
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
                    // TransitionComponent={Transition}
                >
                    <AppBar
                        style={{backgroundColor: "#434746"}}
                        sx={{marginBottom: '10px', position: 'relative'}}>
                        <Toolbar>
                            {/*{!recordForEdit ?*/}
                            {/*    <Typography sx={{ml: 2, flex: 1, color: '#000', letterSpacing: '2px'}}*/}
                            {/*                variant="h6"*/}
                            {/*                component="div">*/}
                            {/*        Нова заявка*/}
                            {/*    </Typography>*/}
                            {/*    :*/}
                            {/*    <Typography sx={{ml: 2, flex: 1, color: '#000', letterSpacing: '2px'}}*/}
                            {/*                variant="h6"*/}
                            {/*                component="div">*/}
                            {/*        Редагувати заявку*/}
                            {/*    </Typography>}*/}
                        </Toolbar>
                    </AppBar>
                    <ServiceForm
                        setOpenService={setOpenService}
                        initialValues={initialValues}
                    />
                </Dialog>
                <ServicesList
                serviceRecords={serviceRecords}
                setServiceRecords={setServiceRecords}
                />
            </Box>
        </>
    );
}

export default ServicesComponent;
