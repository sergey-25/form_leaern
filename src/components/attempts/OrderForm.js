import React, {useState} from 'react';
import {Button, IconButton, TextField} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';




const OrderForm = ({handleSubmit, orderHead, setOrderHead, orderDetails, setOrderDetails, some, setSome}) => {


    const handleOwnerChange = (event) => {
        const { name, value } = event.target;
        setOrderHead((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    // const { address, recipient, comment } = orderHead;

    const orderBlank = {name: '', age: ''};

    const addDetail = () => {
        setOrderDetails([...orderDetails, {...orderBlank}]);
    };

    const removeField = (i) => {
        let detailValues = [orderDetails]
        detailValues.splice(i, 1)
        setOrderDetails(detailValues)
    }

    const handleCatChange = (i, e) => {
        e.preventDefault()
        const updatedDetails = [...orderDetails];
        updatedDetails[i][e.target.name] = e.target.value;
        setOrderDetails(updatedDetails);
    };

    const updateSome = (e) => {

        [e.target.name] = e.target.value
        // if(name === "address" || name === "comment" || name === "recipient")
        setSome(...some);


        // if(name === "name" || name === "age")
        // {
        //     setSome((prevPerson) => {
        //         const newPerson = {...prevPerson}
        //         newPerson.item[name] = value
        //         return newPerson
        //     })
        // }
    }
    const handleDdetailChange = (i, e) => {
        e.preventDefault()
        const updatedDetails = [some[0].item];
        updatedDetails[i][e.target.name] = e.target.value;
        setSome(updatedDetails);

    };




    const addEmail = (item) => {
        const val = {age: '', name:''}
        setSome((prev) => {
            return {...prev, item: [prev.item, {val}]}
        })
    }

    return (
        <div>
            <table>
                <tbody>
                <tr><td>Address:</td><td><input type="text" name="address" value={some[0].address} onChange={updateSome}/></td></tr>
                <tr><td>Comment:</td><td><input type="text" name="comment" value={some[0].comment} onChange={updateSome}/></td></tr>
                <tr><td>Recipient:</td><td><input type="text" name="recipient" value={some[0].recipient} onChange={updateSome}/></td></tr>
                {/*<tr><td>Street:</td><td><input type="text" name="street" value={some.address.street} onChange={(e) => updateSome(e.target)}/></td></tr>*/}
                {/*<tr><td>City:</td><td><input type="text" name="city" value={some.address.city} onChange={(e) => updateSome(e.target)}/></td></tr>*/}
                {/*<tr><td>State:</td><td><input type="text" name="state" value={some.address.stateZip.state} onChange={(e) => updateSome(e.target)}/></td></tr>*/}
                {/*<tr><td>Zip:</td><td><input type="number" name="zip" value={some.address.stateZip.zip} onChange={(e) => updateSome(e.target)}/></td></tr>*/}
                {some.map((t, index) => {
                    return <tr key={index}>
                        <td>Name:</td><td><input type="text"
                                                 onChange={event => handleDdetailChange(index, event)}
                                                 name="name"
                                                 value={some[index].name} /></td>
                        <td>Age:</td><td><input type="text"
                                                onChange={event => handleDdetailChange(index, event)}
                                                name="age"
                                                value={some[index].age} /></td>
                    </tr>
                })}
                <tr><td colSpan={2}><button onClick={addEmail}>Add email</button></td></tr>
                </tbody>
            </table>

            <form>
                <TextField
                    variant='standard'
                    label="Адреса"
                    type="text"
                    name="address"
                    id="address"
                    value={orderHead.address}
                    onChange={handleOwnerChange}
                />

                <TextField
                    variant='standard'
                    label="Отдержувач"
                    type="text"
                    name="recipient"
                    id="recipient"
                    value={some.recipient}
                    onChange={handleOwnerChange}
                />
                <TextField
                    variant='standard'
                    label="Коментар"
                    type="text"
                    name="comment"
                    id="comment"
                    value={orderHead.comment}
                    onChange={handleOwnerChange}
                />
                <Button onClick={addDetail}>
                    Додати
                </Button>
                <div>
                    {orderDetails.map((details, i) => {
                        return (
                            <div key={i}>
                                <TextField
                                    label='name'
                                    variant='standard'
                                    type="text"
                                    name='name'
                                    value={orderDetails[i].name}
                                    onChange={event => handleCatChange(i, event)}
                                />
                                <TextField
                                    label='age'
                                    variant='standard'
                                    type="text"
                                    name='age'
                                    value={orderDetails[i].age}
                                    onChange={event => handleCatChange(i, event)}
                                />
                                {
                                    i ? <IconButton
                                        onClick={() => removeField(i)}
                                        color='error'
                                    >
                                        <DeleteForeverIcon/>
                                    </IconButton> : null
                                }

                            </div>

                        )
                    })}
                </div>
            </form>
            <Button onClick={handleSubmit}>Подати</Button>

        </div>
    );
};

export default OrderForm;
