import React, {useState} from 'react';
import {Box, Tab} from '@mui/material';
import {TabContext, TabList, TabPanel} from '@mui/lab';
import OrdersComponent from "../components/OrdersComponent/OrdersComponent";
import ServicesComponent from "./ServicesComponent/ServicesComponent";
import {Badge, Grid, IconButton} from "@mui/material";
import * as orderService from "../services/orderService";
import * as servicesService from "../services/servicesService";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from '@mui/icons-material/Notifications';
import {Search, SearchIconWrapper, StyledInputBase} from "../styles/Search.styled";
import SortingMenu from "./SortingMenu";

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
        category: 'cczxczx',
        full_name: '',
        service: 'cxcxcx',
        term: new Date(),
        priority: '',
        status: '',
        status_comment: ''
    }
};


export default function AmountComponent() {
    // const [records, setRecords] = useLocalStorage('orders');
    const [records, setRecords] = React.useState(orderService.getAllEmployees());
    const [serviceRecords, setServiceRecords] = React.useState(servicesService.getAllServices());
    const [value, setValue] = React.useState('1');
    const [filterFn, setFilterFn] = React.useState({
        fn: items => {
            return items;
        }
    });

    const [notify, setNotify] = useState({isOpen: false, message: '', type: ''});
    const [confirmOrder, setConfirmOrder] = useState({isOpen: false, title: '', subTitle: ''});
    const [confirmService, setConfirmService] = useState({isOpen: false, title: '', subTitle: ''});


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleSearch = e => {
        e.stopPropagation();
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.address.toLowerCase().includes(target.value) || x.id.toString().toLowerCase().includes(target.value))
            }
        })
    };
    const handleSearchService = e => {
        e.stopPropagation();
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.full_name.toLowerCase().includes(target.value) || x.service.toString().toLowerCase().includes(target.value))
            }
        })
    };
    const FirstTabLabel = () => {
        return (
            <div style={{display: 'flex', alignItems: 'center'}}>
                <p>
                    Перелік замовлень
                </p>
                <p style={{fontSize: '18px', margin: 0}}>
                    <span style={{fontSize: '20px'}}>(</span>
                    {records.length}
                    <span style={{fontSize: '20px'}}>)</span>
                </p>
            </div>
        )
    };

    const SecondTabLabel = () => {
        return (
            <div style={{display: 'flex', alignItems: 'center'}}>
                <p>
                    Перелік послуг
                </p>
                <p style={{fontSize: '18px', margin: 0}}>
                    <span style={{fontSize: '20px'}}>(</span>
                    {serviceRecords.length}
                    <span style={{fontSize: '20px'}}>)</span>
                </p>
            </div>
        )
    };

    const notificationsLabel = (count) => {
        if (count === 0) {
            return 'no notifications';
        }
        if (count > 99) {
            return 'more than 99 notifications';
        }
        return `${count} notifications`;
    };

    return (
        <Box sx={{width: '100%', typography: 'body1'}}>
            <TabContext value={value} sx={{padding: 0}}>
                <Box>
                    <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                        TabIndicatorProps={{
                            style: {
                                backgroundColor: "#a4b9d6",
                            }
                        }}
                        sx={{
                            paddingLeft: '15px',
                            paddingRight: '15px',
                            backgroundColor: '#434746'
                        }}>
                        <Tab label={<FirstTabLabel/>}
                             value="1"
                             sx={{
                                 padding: 0,
                                 paddingLeft: '10px',
                                 paddingRight: '10px',
                                 color: '#fff',
                                 '&.Mui-selected': {
                                     color: '#a4b9d6'
                                 },
                             }}
                        />
                        <Tab label={<SecondTabLabel/>}
                             value="2"
                             sx={{
                                 padding: 0,
                                 paddingLeft: '10px',
                                 paddingRight: '10px',
                                 color: '#fff',
                                 '&.Mui-selected': {
                                     color: '#a4b9d6'
                                 },
                             }}
                        />
                        {value === '1' ?
                            <Grid container alignItems='center' justifyContent='flex-end'>
                                <Grid item>
                                    <IconButton aria-label={notificationsLabel(1)}>
                                        <Badge badgeContent={1}
                                               variant='dot'
                                               color='error'
                                               sx={{color: '#000'}}>
                                            <NotificationsIcon sx={{color: '#a4b9d6'}}/>
                                        </Badge>
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <Search onChange={handleSearch}>
                                        <SearchIconWrapper>
                                            <SearchIcon/>
                                        </SearchIconWrapper>
                                        <StyledInputBase
                                            placeholder="Пошук…"
                                            inputProps={{'aria-label': 'search'}}
                                        />
                                    </Search>
                                </Grid>
                                <Grid item>
                                    <SortingMenu/>
                                </Grid>
                            </Grid>
                            :

                            <Grid container alignItems='center' justifyContent='flex-end'>
                                <Grid item>
                                    <Search onChange={handleSearchService}>
                                        <SearchIconWrapper>
                                            <SearchIcon/>
                                        </SearchIconWrapper>
                                        <StyledInputBase
                                            placeholder="Пошук…"
                                            inputProps={{'aria-label': 'search'}}
                                        />
                                    </Search>
                                </Grid>
                                <Grid item>
                                    <SortingMenu/>
                                </Grid>
                            </Grid>}
                    </TabList>
                </Box>

                <TabPanel value="1" sx={{padding: 0}}>
                    <OrdersComponent
                        records={records}
                        setRecords={setRecords}
                        filterFn={filterFn}
                        setFilterFn={setFilterFn}
                        notify={notify}
                        setNotify={setNotify}
                        confirmOrder={confirmOrder}
                        setConfirmOrder={setConfirmOrder}
                    />
                </TabPanel>
                <TabPanel value="2" sx={{padding: 0}}>
                    <ServicesComponent
                        serviceRecords={serviceRecords}
                        setServiceRecords={setServiceRecords}
                        filterFn={filterFn}
                        setFilterFn={setFilterFn}
                        notify={notify}
                        setNotify={setNotify}
                        confirmService={confirmService}
                        setConfirmService={setConfirmService}
                    />
                </TabPanel>
            </TabContext>
        </Box>
    );
}
