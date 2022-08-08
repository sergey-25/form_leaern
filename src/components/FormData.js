import React, { useState } from 'react'
import {Box, Button, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography,} from '@mui/material'



const DataForm = () => {

    const [info, setInfo] = useState({
        address: "",
        recipient: "",
        comment: ""
    });

    const [orderDetails, setOrderDetails] = useState({
        name: "",
        details:[ {
            color: "",
            size:"",
            // isManager: false
        }]
    });

    const onChangeLocation = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        });
    };

    const onChangeName = (e) => {
        setOrderDetails({
            ...orderDetails,
            [e.target.name]: e.target.value
        });
    }

    const onChangeCompany = (e, i) => {
        setOrderDetails({
            ...orderDetails,
            details:[{
                ...orderDetails.details[i][e.target.name] = e.target.value
                // [e.target.name]: e.target.value
            }]
        });
    }


    // const onChangeIsManager = (e) => {
    //     setOrderDetails([{
    //         ...orderDetails,
    //         details: [{
    //             ...orderDetails.details,
    //             [e.target.name]: [!orderDetails.details.isManager]
    //         }]
    //     }]);
    // }

    const orderBlank = {color: '', size: ''};
    const handleUpdate = (i) => {

        setOrderDetails([orderDetails.details,({color: '', size: ''})]);
        // const ddd = [orderDetails.details]
        // setOrderDetails({
        //
        //     details:[{
        //         ...orderDetails.details,
        //         color: 'ssss', size: 'ssss'
        //     }]
        // }
        // )
    }
    console.log(orderDetails)
    return (
        <>
            <Button onClick={handleUpdate}>up</Button>
            <Box m={5}>
                <Typography variant='h6'>Handle State with Object</Typography>
            </Box>
            <Box ml={5} p={2} >
                <Typography variant='body1'>{JSON.stringify(info)}</Typography>
            </Box>
            <Box m={5}>
                <TextField label='Адреса' value={info.address} name='address' onChange={onChangeLocation} />
            </Box>
            <Box m={5}>
                <TextField label='Одержувач' value={info.recipient} name='recipient' onChange={onChangeLocation} />
            </Box>
            <Box m={5}>
                <TextField label='Коментар' value={info.comment} name='comment' onChange={onChangeLocation} />
            </Box>

            <Box ml={5} p={2} >
                <Typography variant='body1'>{JSON.stringify(orderDetails)}</Typography>
            </Box>
            <Box m={5}>
                <TextField label='Name' value={orderDetails.name} name='name' onChange={onChangeName} />
            </Box>
            {orderDetails.details.map((detail, i)=>{
                return(
                    <>
                        <div>
                            <Box m={5}>
                                <TextField label='Колір' value={detail.color} name='color'
                                           onChange={e =>onChangeCompany(e,i)} />
                            </Box>
                            <Box m={5}>
                                <TextField label='Колір' value={detail.size} name='size'
                                           onChange={e =>onChangeCompany(e,i)} />
                            </Box>

                        </div>

                    </>
                )

            })}

            {/*<Box m={5}>*/}
            {/*    <FormLabel component="legend">Is Manager</FormLabel>*/}
            {/*    <RadioGroup value={orderDetails.details.isManager}  name="isManager" onChange={onChangeIsManager}>*/}
            {/*        <FormControlLabel value={false} control={<Radio />} label="F" />*/}
            {/*        <FormControlLabel value={true} control={<Radio />} label="T" />*/}
            {/*    </RadioGroup>*/}
            {/*</Box>*/}
        </>
    )
}

export default DataForm
