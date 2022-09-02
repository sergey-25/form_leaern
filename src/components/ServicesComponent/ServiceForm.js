import React, {useEffect} from 'react';
import {
    Box,
    Button,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import {Form, useForm} from "../hooks/useForm";
import {
     StyledTableCellBody,
    StyledTableRow
} from "../../styles/FormTable.styled";
import {StyledPaper} from "../../styles/Table.styled";
import CustomDateField from "../controls/CustomDateField";
import FormSelect from "../controls/FormSelect";


const priorityOptions = [
    {id: 'high', title: 'Висока'},
    {id: 'medium', title: 'Помірна'},
    {id: 'low', title: 'Низька'},

];



function ServiceForm({
                         setOpenService,
                         initialValues,
                         serviceRecordForEdit,
                         addOrEdit,
                         isDisabled,
                         setIsDisabled
                     }) {




    const {
        values,
        setValues,
        errors,
        setErrors,
        handleValuesChange,
        handleContactChange,
        resetForm
    } = useForm(
        initialValues
    );


    const handleCloseForm = () => {
        setOpenService(false)
        setIsDisabled(false)
    };

    useEffect(() => {
        if (serviceRecordForEdit != null)
            setValues({
                ...serviceRecordForEdit
            })
    }, [serviceRecordForEdit]);


    const handleSubmit = e => {
        e.preventDefault()
        addOrEdit(values, resetForm);
        setIsDisabled(false)
    };


    return (
        <div>

            <Box p={2}>
                <Form>
                    {values.contacts.map((contact, i) => {
                        return (
                            <Grid
                                key={i}
                                container
                                xs={12} md={6} l={3}
                                direction='column'>
                                <Grid item>
                                    <TextField
                                        // required
                                        fullWidth
                                        disabled={isDisabled}
                                        variant='standard'
                                        label='ПІБ'
                                        name='name'
                                        onChange={e => {
                                            handleContactChange(e, i)
                                        }}
                                        value={values.contacts[i].name}
                                        // error={!!errors.address}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        // required
                                        disabled={isDisabled}
                                        type='number'
                                        fullWidth
                                        variant='standard'
                                        label='Номер телефону'
                                        name='phone_number'
                                        onChange={e => {
                                            handleContactChange(e, i)
                                        }}
                                        value={values.contacts[i].phone_number}
                                        // error={!!errors.address}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        // required
                                        fullWidth
                                        disabled={isDisabled}
                                        variant='standard'
                                        label='Адреса'
                                        name='address'
                                        onChange={e => {
                                            handleContactChange(e, i)
                                        }}
                                        value={values.contacts[i].address}
                                        // error={!!errors.address}
                                    />
                                </Grid>
                            </Grid>
                        )
                    })}
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
                                        {/*<TableCell>Дії</TableCell>*/}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <StyledTableRow>
                                        <StyledTableCellBody>
                                            <TextField
                                                multiline
                                                variant='standard'
                                                name='category'
                                                onChange={handleValuesChange}
                                                value={values.category}
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
                                                name='full_name'
                                                disabled={isDisabled}
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
                                        <StyledTableCellBody style={{width: '150px'}}>
                                            <CustomDateField
                                                name='term'
                                                onChange={handleValuesChange}
                                                value={`До ${values.term}`}
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
                                        <StyledTableCellBody>
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
                                                value={values.priority}
                                                name='priority'
                                                disableUnderline
                                                onChange={handleValuesChange}
                                                disabled={isDisabled}
                                            />
                                        </StyledTableCellBody>
                                        <StyledTableCellBody>
                                            <TextField
                                                multiline
                                                variant='standard'
                                                name='status_comment'
                                                onChange={handleValuesChange}
                                                value={values.status_comment}
                                                disabled={isDisabled}
                                                InputProps={{
                                                    disableUnderline: true,
                                                    style: {fontSize: 12}
                                                }}
                                            />
                                        </StyledTableCellBody>
                                    </StyledTableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Form>
                <Button onClick={handleSubmit}>Подати</Button>
                <Button onClick={handleCloseForm}>
                    Скасувати
                </Button>
            </Box>
        </div>
    );
}

export default ServiceForm;
