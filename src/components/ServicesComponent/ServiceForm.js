import React from 'react';
import {
    Box,
    Button, FormControl,
    Grid, IconButton, MenuItem, Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField, Tooltip
} from "@mui/material";
import {Form, useForm} from "../hooks/useForm";
import {
    StyledTable, StyledTableCellBody,
    StyledTableCellHead,
    StyledTableHead,
    StyledTableRow
} from "../OrdersComponent/orderForm/OrderForm";
import {StyledPaper} from "../hooks/useTable";
import CustomDateField from "../controls/CustomDateField";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";

function ServiceForm({setOpenService, initialValues}) {


    const validate = (fieldValues = values) => {
        let temp = {...errors}

        if ('contact' in fieldValues)
            temp.contact = fieldValues.contact ? "" : "Поле не має бути пустим."

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
        handleValuesChange,
        resetForm
    } = useForm(
        initialValues,
        // true, validate
    );
    const handleCloseForm = () => {
        setOpenService(false)
    }
    const addDetail = (e) => {
        let temp = {...values};
        temp.services.push(
            {
                category: '',
                full_name: '',
                service: '',
                term: new Date(),
                priority: '',
                status: '',
                status_comment: ''
            }
        );
        setValues(temp);
    };


    return (
        <div>

            <Box p={2}>
                <Form>
                    <Grid container
                          xs={12} md={6} l={3}
                          direction='column'>
                        <Grid item xs={12} md={6} l={3}>
                            <TextField required
                                       fullWidth
                                       variant='standard'
                                       label='Контактні дані'
                                       name='contact'
                                       onChange={handleValuesChange}
                                       value={values.contact}
                                // error={!!errors.address}
                            />
                        </Grid>
                    </Grid>
                    <br/>
                    <br/>
                    <div>
                        <TableContainer component={StyledPaper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Категорія</TableCell>
                                        <TableCell>Найменування</TableCell>
                                        <TableCell>Опис</TableCell>
                                        <TableCell>Термін</TableCell>
                                        <TableCell>Важливість</TableCell>
                                        <TableCell>Коментар</TableCell>
                                        <TableCell>Дії</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <StyledTableRow>
                                        {/*<TableCell style={{padding:'0'}}>*/}
                                        {/*    <span style={{fontSize: '18px'}}>{i + 1}: </span>*/}
                                        {/*</TableCell>*/}
                                        <StyledTableCellBody>
                                            <TextField
                                                multiline
                                                variant='standard'
                                                name='category'
                                                // selected={values.details[i].full_name}
                                                onChange={handleValuesChange}
                                                value={values.category}
                                                // disabled={isDisabled}
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
                                                name='full_name'
                                                // disabled={isDisabled}
                                                onChange={handleValuesChange}
                                                value={values.full_name}
                                                InputProps={{
                                                    disableUnderline: true,
                                                    style: {fontSize: 12}
                                                }}
                                            />
                                        </StyledTableCellBody>
                                        <StyledTableCellBody style={{width: '400px'}}>
                                            <TextField
                                                fullWidth='true'
                                                multiline
                                                variant='standard'
                                                name='service'
                                                onChange={handleValuesChange}
                                                value={values.service}
                                                // disabled={isDisabled}
                                                InputProps={{
                                                    disableUnderline: true,
                                                    style: {fontSize: 12}
                                                }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </StyledTableCellBody>
                                        <StyledTableCellBody style={{width: '150px'}}>
                                            <CustomDateField
                                                name='term'
                                                onChange={handleValuesChange}
                                                value={`До ${values.term}`}
                                                // disabled={isDisabled}
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
                                        <StyledTableCellBody>
                                            <TextField
                                                multiline
                                                variant='standard'
                                                name='priority'
                                                onChange={handleValuesChange}
                                                value={values.priority}
                                                // disabled={isDisabled}
                                                InputProps={{
                                                    disableUnderline: true,
                                                    style: {
                                                        fontSize: 12,
                                                    }
                                                }}
                                            />
                                        </StyledTableCellBody>
                                        <StyledTableCellBody>
                                            <TextField
                                                multiline
                                                variant='standard'
                                                name='status_comment'
                                                onChange={handleValuesChange}
                                                value={values.status_comment}
                                                // disabled={isDisabled}
                                                InputProps={{
                                                    disableUnderline: true,
                                                    style: {fontSize: 12}
                                                }}
                                            />
                                        </StyledTableCellBody>
                                        <StyledTableCellBody align='center' style={{display: 'flex'}}>
                                            {/*<Tooltip title='Дублювати'>*/}
                                            {/*    <IconButton*/}
                                            {/*        variant='contained'*/}
                                            {/*        // disabled={isDisabled}*/}
                                            {/*        style={{color: '#434746'}}*/}
                                            {/*        // onClick={() => {*/}
                                            {/*        //     handleClone(value)*/}
                                            {/*        // }}*/}
                                            {/*    >*/}
                                            {/*        <ContentCopyIcon style={{fontSize: 20}}/>*/}
                                            {/*    </IconButton>*/}
                                            {/*</Tooltip>*/}
                                            {/*{i ?*/}
                                            {/*    <Tooltip title='Видалити'>*/}
                                            {/*        <IconButton variant='contained'*/}
                                            {/*                    disabled={isDisabled}*/}
                                            {/*                    color='error'*/}
                                            {/*                    onClick={e => {*/}
                                            {/*                        deleteDetail(e, i)*/}
                                            {/*                    }}*/}
                                            {/*        >*/}
                                            {/*            <DeleteForeverIcon style={{fontSize: 20}}/>*/}
                                            {/*        </IconButton>*/}
                                            {/*    </Tooltip>*/}
                                            {/*    :*/}
                                            {/*    null}*/}
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
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Form>
                <Button
                    aria-label="add"
                    variant='outlined'
                    color='primary'
                    // disabled={isDisabled}
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
                <Button onClick={() => {
                    console.log('add')
                }}>Подати</Button>
                <Button onClick={handleCloseForm}>
                    Скасувати
                </Button>
            </Box>
        </div>
    );
}

export default ServiceForm;
