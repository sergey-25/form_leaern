import React, {useState} from 'react';
import {Button, Container, Divider, Paper, TextField} from "@mui/material";

function Data(props) {
    const initial = [{
        id: Math.floor(Math.random() * 100),
        name: '',
        details: [{
            color: '',
            size: ''
        }]
    }];
    const [isHovering, setIsHovering] = useState({
        isHovered: {}
    });
    const [card, setCard] = useState([])
    const [subState, setSubState] = useState([])
    const [state, setState] = useState([
        {
            id: 0,
            name: 'Serhii',
            details: [{
                color: 'Orange',
                size: 'XL'
            },
                {
                    color: '#000',
                    size: 'L/XL'
                },
                {
                    color: 'Grey',
                    size: 'L'
                }
            ],
        },
        {
            id: 1,
            name: 'Iryna',
            details: [{
                color: 'Blue',
                size: 'M'
            },
                {
                    color: 'Black',
                    size: 'S/M'
                }
            ],
        },
        {
            id: 2,
            name: 'Volodymir',
            details: [{
                color: 'Red',
                size: 'XS'
            },
                {
                    color: 'Peach',
                    size: 'XS/S'
                }
            ],

        }]);
    const sub = () => {
        const newCard = [...initial]
        setSubState(newCard)
        console.log(newCard)
    }
    const save = (e) => {
        e.preventDefault()
        setSubState(state)

    }
    // const handleChange = (event) => {
    //     const [name, value] = [event.target];
    //     setState((prevState) => {
    //         return {
    //             ...prevState,
    //             [name]: value,
    //         };
    //     });
    // };
    // const handleComment = (e, item, some) => {
    //     e.preventDefault();
    //     let result = state;
    //     result = result.map((el) => {
    //         if (el.name === item.name)el.name = e.target.value;
    //         el.details.map((detail) =>{
    //             if (detail.color === some.color)detail.color = e.target.value;
    //             console.log(detail)
    //         })
    //         return el;
    //
    //     });
    //     setState(result);
    // };
    const handleChange = (evt) => {
        const value =
            evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    }

console.log(state)
    return (
        <Container>

            <div>
                {/*{state.map((item, index) =>{*/}
                {/*    return(*/}
                <TextField
                    variant="standard"
                    name='name'
                    value={state.name}
                    onChange={handleChange}
                />
                {/*    )*/}
                {/*})}*/}
            </div>

            <div>
                <Button onClick={sub}>sub</Button>
                {state.map((item, i) => {
                    return (
                        <>
                            <Paper style={{}}

                            >
                                <h1 key={i}>
                                    {item.name}
                                </h1>
                                {(typeof (item.details) == 'object') ?
                                    <div>
                                        {item.details.map((detail, index) => {
                                            return (
                                                <>

                                                    <div
                                                        key={index}
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            border: '1px solid gray',
                                                            borderRadius: '10px',
                                                            marginBottom: '10px',
                                                        }}
                                                    >
                                                        <h6 style={{padding: '20px'}}>
                                                            {detail.size}
                                                        </h6>
                                                        <h6 style={{padding: '20px'}}>
                                                            {detail.color}
                                                        </h6>
                                                        <Divider/>
                                                    </div>

                                                </>
                                            )
                                        })}
                                    </div>
                                    :
                                    null
                                }

                            </Paper>
                        </>
                    )
                })}
            </div>
        </Container>
    );
}

export default Data;
