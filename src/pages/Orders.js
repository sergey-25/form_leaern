import React, {useState} from 'react';
import {Button, Dialog, Paper} from "@mui/material";
import OrdersList from "../components/OrdersList";
import OrderForm from "../components/OrderForm";
import DataForm from "../components/FormData";
import YouTubeForm from "../components/YouTubeForm";

function Orders(props) {

    const [isOpen, setIsOpen] = useState(false)

    const initialValues = {
        main: {
            address: '',
            recipient: '',
            comment: ''
        },
        item: [{
            name: '',
            age: ''
        }
        ]
    }


    const [some, setSome] = useState([initialValues])
    const initialState = {
        address: '',
        recipient: '',
        comment: ''
    }
    const [orderHead, setOrderHead] = useState(
        {initialState}
    );
    const orderBlank = {name: '', age: ''};

    const [orderDetails, setOrderDetails] = useState([
        orderBlank]);

    const [orders, setOrders] = useState([
        // {main: {...initialState}},
        // {detail: [{...orderBlank}]}
    ])

    // const addHead =(head) =>{
    //     setOrderHead([...orderHead, {...initialState} ])
    // }
    // const addDetail =() =>{
    //     setOrderDetails([...orderDetails])
    // }


    const addOrder = (order, detail) => {
        // const newOrder = [{orders: [orderHead, orderDetails]}];
        // const newHead = {address: '', recipient: '', comment: ''}
        //     const newOrder = {
        //     setOrderHead([...orderHead, initialState]),
        //         setOrderDetails([...orderDetails, orderBlank])
        // }

        const newF = [orderHead, orderDetails]
        setOrders(newF)
        // console.log(newF)
        // console.log(orderHead)

    };


    const handleSubmit = (e) => {
        e.preventDefault()
        addOrder()
        setIsOpen(false)

    }

    const handleDialogOpen = () => {
        setIsOpen(true)
    }

    return (
        <>
            {console.log(some[0].main)}

            <YouTubeForm/>
            <DataForm/>

            <div>


                {/*{some.map((order,i) =>{*/}
                {/*    return(*/}
                {/*        <>*/}

                {/*                {order.address}*/}
                {/*            {order.item.map((part, i)=>{*/}
                {/*                return(*/}
                {/*                    <>*/}
                {/*                        <h1>*/}
                {/*                            {part.name}-*/}
                {/*                            {part.age}*/}
                {/*                        </h1>*/}
                {/*                    </>*/}
                {/*                )*/}
                {/*            })}*/}
                {/*            /!*{order.age}*!/*/}


                {/*            /!*{orders[1].map((item, i) =>{*!/*/}
                {/*            /!*    return(*!/*/}
                {/*            /!*        <>*!/*/}
                {/*            /!*            <p key={i}>*!/*/}
                {/*            /!*                {item.age}*!/*/}
                {/*            /!*            </p>*!/*/}
                {/*            /!*            {console.log(item)}*!/*/}
                {/*            /!*        </>*!/*/}
                {/*            /!*    )*!/*/}
                {/*            /!*})}*!/*/}
                {/*        </>*/}
                {/*    )*/}
                {/*})}*/}

                <Button onClick={addOrder}>try</Button>
                <Dialog
                    fullScreen
                    open={isOpen}>
                    <OrderForm
                        handleSubmit={handleSubmit}
                        some={some}
                        setSome={setSome}
                        orderHead={orderHead}
                        setOrderHead={setOrderHead}
                        orderDetails={orderDetails}
                        setOrderDetails={setOrderDetails}
                    />
                </Dialog>
                <Button onClick={handleDialogOpen}>add</Button>

                <OrdersList
                    // setOrder={setOrders}
                    orderHead={orderHead}
                    setOrderHead={setOrderHead}
                    orderDetails={orderDetails}
                    setOrderDetails={setOrderDetails}
                />
            </div>
        </>
    );
}

export default Orders;
