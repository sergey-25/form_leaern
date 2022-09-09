import React, {forwardRef, useEffect} from 'react';
import {useForm, Form} from '../../hooks/useForm';


import {
    Button,
    Container,
    FormControl,
    Grid,
    IconButton,
    MenuItem,
    Select, TableBody, TableContainer, TableRow,
    TextField, Tooltip

} from "@mui/material";

import CustomDateField from "../../controls/CustomDateField";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddIcon from "@mui/icons-material/Add";
import FormSelect from "../../controls/FormSelect";
import {
    StyledTable,
    StyledTableCellBody,
    StyledTableCellHead,
    StyledTableHead,
    StyledTableRow,
    StyledFormPaper
} from "../../../styles/FormTable.styled";


const sizeClosesOptions = [
    {id: 'XS', title: 'XS'},
    {id: 'S', title: 'S'},
    {id: 'M', title: 'M'},
    {id: 'L', title: 'L'},
    {id: 'XL', title: 'XL'},
    {id: 'XXL', title: 'XXL'},
    {id: 'XXXL', title: 'XXXL'}
];

const sizeShoesOptions = [
    {id: '36', title: '36'},
    {id: '37', title: '37'},
    {id: '38', title: '38'},
    {id: '39', title: '39'},
    {id: '40', title: '40'},
    {id: '41', title: '41'},
    {id: '42', title: '42'}
];

const priorityOptions = [
    {id: 'high', title: 'Висока'},
    {id: 'medium', title: 'Помірна'},
    {id: 'low', title: 'Низька'},

];


function OrderForm({
                       componentRef,
                       setOpenForm,
                       initialValues,
                       addOrEdit,
                       recordForEdit,
                       isDisabled,
                       setIsDisabled,
                       setIsLoading,
                   }) {

    // const [anchorEl, setAnchorEl] = useState(false);
    //
    // const openMenu = Boolean(anchorEl);
    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };
    // const handleClose = () => {
    //     // setAnchorEl(false);
    // };


    const addDetail = (e) => {
        let temp = {...values};
        temp.details.push(
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
        );
        setValues(temp);
    };


    const deleteDetail = (e, i) => {
        let temp = {...values}
        temp.details.splice(i, 1)
        setValues(temp)
    };


    const validate = (fieldValues = values) => {
        let temp = {...errors}

        if ('address' in fieldValues)
            temp.address = fieldValues.address ? "" : "Поле не має бути пустим."

        // if ('location' in fieldValues)
        //     temp.location = fieldValues.location ? "" : "Поле не має бути пустим."
        // //  temp.location = (/$^|.+@.+..+/).test(fieldValues.location) ? "" : "location is not valid."
        //
        // if ('productionPlace' in fieldValues)
        //     temp.productionPlace = fieldValues.productionPlace ? "" : "Поле не має бути пустим."
        //
        // if ('edrpou' in fieldValues)
        //     temp.edrpou = fieldValues.edrpou ? "" : "Поле не має бути пустим."
        //
        // if ('idNumber' in fieldValues)
        //     temp.idNumber = (/^[0-9\b]+$/).test(fieldValues.idNumber) ? "" : "Має бути заповнено в числовому форматі."
        //
        // if ('whenIssued' in fieldValues)
        //     temp.whenIssued = fieldValues.whenIssued ? "" : "Поле не має бути пустим."
        //
        // if ('registrationNumber' in fieldValues)
        //     temp.registrationNumber = fieldValues.registrationNumber ? "" : "Поле не має бути пустим."
        //
        // if ('initials' in fieldValues)
        //     temp.initials = fieldValues.initials ? "" : "Поле не має бути пустим."
        //
        // if ('email' in fieldValues)
        //     temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Поле заповнено невірно."

        // .length > 9 ? "" : "Minimum 10 numbers required."
        // if ('departmentId' in fieldValues)
        //     temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        handleValuesChange,
        handleDetailChange,
        resetForm
    } = useForm(
        initialValues,
        true, validate
    );


    const handleClone = (item) => {
        let cloneValues = {...values}
        let copyCurrentValue = {...item}
        cloneValues.details.push(copyCurrentValue)
        setValues(cloneValues)
    };


    const closeForm = () => {
        setOpenForm(false)
        setIsDisabled(false)
    };


    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })


    }, [recordForEdit]);


    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            setIsLoading(true)
            addOrEdit(values, resetForm);
            setIsDisabled(false)
        }
    };

    return (
        <div>
            <Container maxWidth='false'>
                <div>
                    <Form ref={componentRef}>
                        <Grid container
                              xs={12} md={6} l={3}
                              direction='column'>
                            <Grid item xs={12} md={6} l={3}>
                                <TextField required fullWidth='true' variant='standard' name='address' label='Адреса'
                                           onChange={handleInputChange} value={values.address}
                                           error={!!errors.address}
                                           disabled={isDisabled}
                                           style={{
                                               '& disabled': {
                                                   backgroundColor: 'red',
                                               },
                                           }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} l={3}>
                                <TextField fullWidth='true'
                                           variant='standard' name='recipient' label='Одержувач'
                                           onChange={handleValuesChange} value={values.recipient}
                                           disabled={isDisabled}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} l={3}>
                                <TextField fullWidth='true'
                                           multiline
                                           rows={3}
                                           variant='standard' name='comment' label='Коментар'
                                           onChange={handleValuesChange} value={values.comment}
                                           disabled={isDisabled}
                                />
                            </Grid>
                        </Grid>
                        <br/>
                        <br/>
                        <div>
                            <TableContainer style={{overflowX: 'auto'}} component={StyledFormPaper}>
                                <StyledTable id="my-table">
                                    <StyledTableHead>
                                        <TableRow>
                                            <StyledTableCellHead>Категорія</StyledTableCellHead>
                                            <StyledTableCellHead>Найменування</StyledTableCellHead>
                                            <StyledTableCellHead>Колір</StyledTableCellHead>
                                            <StyledTableCellHead>Розмір</StyledTableCellHead>
                                            <StyledTableCellHead>Кількість</StyledTableCellHead>
                                            <StyledTableCellHead>Посилання</StyledTableCellHead>
                                            <StyledTableCellHead>Коментар</StyledTableCellHead>
                                            <StyledTableCellHead>Термін</StyledTableCellHead>
                                            <StyledTableCellHead>Важливість</StyledTableCellHead>
                                            <StyledTableCellHead>Дії</StyledTableCellHead>
                                        </TableRow>
                                    </StyledTableHead>
                                    <TableBody>
                                        {values.details.map((value, i) => {
                                            return (
                                                <StyledTableRow key={i}>
                                                    {/*<TableCell style={{padding:'0'}}>*/}
                                                    {/*    <span style={{fontSize: '18px'}}>{i + 1}: </span>*/}
                                                    {/*</TableCell>*/}
                                                    <StyledTableCellBody>
                                                        <FormControl fullWidth='true'>
                                                            <Select
                                                                defaultValue=""
                                                                SelectDisplayProps={{
                                                                    style: {
                                                                        fontWeight: 600,
                                                                        display: 'flex',
                                                                        justifyContent: 'center'
                                                                    }
                                                                }}
                                                                variant='standard'
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                value={values.details[i].category}
                                                                name='category'
                                                                disableUnderline
                                                                onChange={(e) => {
                                                                    handleDetailChange(e, i, value)
                                                                }}
                                                                disabled={isDisabled}

                                                            >
                                                                <MenuItem
                                                                    style={{
                                                                        fontSize: '14px',
                                                                        justifyContent: 'center',
                                                                    }}
                                                                    divider={true}
                                                                    value={'clothing'}>
                                                                    Одяг
                                                                </MenuItem>
                                                                <MenuItem
                                                                    style={{
                                                                        fontSize: '14px',
                                                                        justifyContent: 'center',
                                                                    }}
                                                                    divider={true}
                                                                    value={'footwear'}>
                                                                    Взуття
                                                                </MenuItem>
                                                                <MenuItem
                                                                    style={{
                                                                        fontSize: '14px',
                                                                        justifyContent: 'center',
                                                                    }}
                                                                    divider={true}
                                                                    value={'other'}>
                                                                    Інше
                                                                </MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </StyledTableCellBody>
                                                    <StyledTableCellBody>
                                                        <TextField
                                                            multiline
                                                            variant='standard'
                                                            name='full_name'
                                                            selected={values.details[i].full_name}
                                                            onChange={e => handleDetailChange(e, i)}
                                                            value={values.details[i].full_name}
                                                            disabled={isDisabled}
                                                            InputProps={{
                                                                disableUnderline: true,
                                                                style: {fontSize: 12}
                                                            }}
                                                        />
                                                    </StyledTableCellBody>
                                                    <StyledTableCellBody>
                                                        <TextField
                                                            multiline
                                                            variant='standard'
                                                            name='color'
                                                            disabled={isDisabled}
                                                            onChange={e => handleDetailChange(e, i)}
                                                            value={values.details[i].color}
                                                            InputProps={{
                                                                disableUnderline: true,
                                                                style: {fontSize: 12}
                                                            }}
                                                        />
                                                    </StyledTableCellBody>
                                                    <StyledTableCellBody>
                                                        <FormSelect
                                                            options={value.category === 'clothing' ? sizeClosesOptions : sizeShoesOptions}
                                                            defaultValue=""
                                                            SelectDisplayProps={{
                                                                style: {
                                                                    fontWeight: 600,
                                                                    display: 'flex',
                                                                    justifyContent: 'center'
                                                                }
                                                            }}
                                                            value={values.details[i].size}
                                                            name='size'
                                                            disableUnderline
                                                            onChange={e => handleDetailChange(e, i)}
                                                            disabled={isDisabled}
                                                        />
                                                    </StyledTableCellBody>
                                                    <StyledTableCellBody style={{width: '50px'}}>
                                                        <TextField
                                                            type='number'
                                                            variant='standard'
                                                            name='amount'
                                                            onChange={e => handleDetailChange(e, i)}
                                                            value={values.details[i].amount}
                                                            disabled={isDisabled}
                                                            InputProps={{
                                                                disableUnderline: true,
                                                                style: {fontSize: 12}
                                                            }}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </StyledTableCellBody>
                                                    <StyledTableCellBody style={{width: '220px'}}>
                                                        <TextField
                                                            fullWidth='true'
                                                            multiline
                                                            variant='standard'
                                                            name='link'
                                                            onChange={e => handleDetailChange(e, i)}
                                                            value={values.details[i].link}
                                                            disabled={isDisabled}
                                                            InputProps={{
                                                                disableUnderline: true,
                                                                style: {fontSize: 12},
                                                            }}
                                                        />
                                                    </StyledTableCellBody>
                                                    <StyledTableCellBody style={{width: '300px'}}>
                                                        <TextField
                                                            fullWidth='true'
                                                            multiline
                                                            variant='standard'
                                                            name='comment'
                                                            onChange={e => handleDetailChange(e, i)}
                                                            value={values.details[i].comment}
                                                            disabled={isDisabled}
                                                            InputProps={{
                                                                disableUnderline: true,
                                                                style: {fontSize: 12}
                                                            }}
                                                        />
                                                    </StyledTableCellBody>
                                                    <StyledTableCellBody style={{width: '150px'}}>
                                                        <CustomDateField
                                                            name='term'
                                                            onChange={e => handleDetailChange(e, i)}
                                                            value={`До ${values.details[i].term}`}
                                                            disabled={isDisabled}
                                                            InputProps={{
                                                                disableUnderline: true,
                                                                style: {
                                                                    fontSize: 13,
                                                                    fontWeight: 600,
                                                                    padding: '5px'
                                                                },
                                                                sx: {"& .MuiSvgIcon-root": {color: "#5c7a77"}}
                                                            }}
                                                            renderInput={(params) => <TextField
                                                                placeholder='До'
                                                                name='term'
                                                                variant='standard'
                                                                {...params}
                                                            />}
                                                        />
                                                    </StyledTableCellBody>
                                                    <StyledTableCellBody style={{
                                                        backgroundColor:
                                                            value.priority === 'Висока' ? '#e11f2e'
                                                                : value.priority === 'Помірна' ? '#f7e439'
                                                                    : value.priority === 'Низька' ? '#27ce2b' : '#fff'
                                                    }}>
                                                        <FormSelect
                                                            options={priorityOptions}
                                                            defaultValue=""
                                                            SelectDisplayProps={{
                                                                style: {
                                                                    fontWeight: 600,
                                                                    display: 'flex',
                                                                    justifyContent: 'center'
                                                                }
                                                            }}
                                                            value={values.details[i].priority}
                                                            name='priority'
                                                            disableUnderline
                                                            onChange={e => handleDetailChange(e, i)}
                                                            disabled={isDisabled}
                                                        />
                                                    </StyledTableCellBody>
                                                    <StyledTableCellBody align='center' style={{display: 'flex'}}>
                                                        <Tooltip title='Дублювати'>
                                                            <IconButton
                                                                variant='contained'
                                                                disabled={isDisabled}
                                                                style={{color: '#434746'}}
                                                                onClick={() => {
                                                                    handleClone(value)
                                                                }}
                                                            >
                                                                <ContentCopyIcon style={{fontSize: 20}}/>
                                                            </IconButton>
                                                        </Tooltip>
                                                        {i ?
                                                            <Tooltip title='Видалити'>
                                                                <IconButton variant='contained'
                                                                            disabled={isDisabled}
                                                                            color='error'
                                                                            onClick={e => {
                                                                                deleteDetail(e, i)
                                                                            }}
                                                                >
                                                                    <DeleteForeverIcon style={{fontSize: 20}}/>
                                                                </IconButton>
                                                            </Tooltip>
                                                            :
                                                            null}
                                                    </StyledTableCellBody>
                                                    {/*{*/}
                                                    {/*    branch.contacts.map((contact, j) => (*/}
                                                    {/*        <div style={{padding: '10px'}} key={j}>*/}
                                                    {/*            <span style={{fontSize: '18px'}}>Contact {j + 1}: </span>*/}
                                                    {/*            <TextField variant='standard' name='contact' placeholder='Contact'*/}
                                                    {/*                       onChange={e => handleContactChange(e, i, j)}*/}
                                                    {/*                       value={state.details[i].contacts[j]}*/}
                                                    {/*            />*/}
                                                    {/*            <IconButton variant='contained' color='error'*/}
                                                    {/*                        style={{marginLeft: '10px'}}*/}
                                                    {/*                        onClick={e => deleteContact(e, i, j)}*/}
                                                    {/*            ><DeleteForeverIcon style={{fontSize: 20}}/></IconButton>*/}
                                                    {/*        </div>*/}

                                                    {/*    ))*/}
                                                    {/*}*/}
                                                    {/*<Button variant='outlined' color='primary'*/}
                                                    {/*        onClick={e => addContact(e, i)}>*/}
                                                    {/*    <AddIcon/>*/}
                                                    {/*    Додати</Button>*/}

                                                </StyledTableRow>
                                            )
                                        })}
                                    </TableBody>
                                </StyledTable>
                            </TableContainer>
                        </div>
                    </Form>
                    <Grid
                        container
                        direction='row'
                        justifyContent='space-between'
                        style={{marginTop: '20px'}}
                    >
                        <Grid item xs={4}>
                            <Button
                                aria-label="add"
                                variant='outlined'
                                color='primary'
                                disabled={isDisabled}
                                onClick={addDetail}
                                sx={{
                                    borderColor: '#434746',
                                    color: '#434746',
                                    letterSpacing: '3px',
                                    fontSize: '13px',
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        borderColor: '#a4b9d6',
                                        backgroundColor: '#ebeff6',
                                    }
                                }}
                            >
                                <AddIcon style={{paddingRight: '10px'}}/>
                                Додати
                            </Button>
                        </Grid>
                        <Grid
                            container
                            direction='row'
                            xs={4}
                            spacing={2}
                            justifyContent="flex-end">
                            <Grid item>
                                <Button
                                    mr={2}
                                    variant='outlined'
                                    size='medium'
                                    onClick={handleSubmit}
                                    sx={{
                                        borderColor: '#434746',
                                        color: '#434746',
                                        letterSpacing: '3px',
                                        fontSize: '13px',
                                        fontWeight: 'bold',
                                        '&:hover': {
                                            borderColor: '#a4b9d6',
                                            backgroundColor: '#ebeff6',
                                        }
                                    }}
                                >
                                    {!recordForEdit ? 'Подати' : 'Зберегти'}
                                </Button>

                            </Grid>
                            <Grid item>
                                <Button
                                    variant='outlined'
                                    size='medium'
                                    color='error'
                                    onClick={closeForm}
                                    sx={{
                                        letterSpacing: '3px',
                                        fontSize: '13px',
                                        fontWeight: 'bold',
                                        borderColor: '#d32f2f',
                                        '&:hover': {}
                                    }}
                                >
                                    Скасувати
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>

            </Container>
        </div>
    );
}

export default forwardRef(OrderForm);
