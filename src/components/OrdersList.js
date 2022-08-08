import React, {useEffect} from 'react';
import {Button} from "@mui/material";

function OrdersList({formValues,orderHead, orderDetails, setOrderHead, setOrderDetails}) {



    useEffect(() => {
        // setOrderDetails(orderDetails)
    }, []);

    return (
        <div>
            <Button onClick={()=>console.log(orderDetails)}>result</Button>

            <div>
                {formValues.map((value, index) =>{
                    return(
                        <>
                            <p>{value.name}</p>
                        </>
                    )
                })}
            </div>
            OrdersList
        </div>
    );
}

export default OrdersList;
