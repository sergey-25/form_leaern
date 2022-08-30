import React, {useState} from 'react'


export function useForm(initialValues, validateOnChange = false, validate, setSelectValue, selectValue) {


    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});


    const handleValuesChange = e => {
        let temp = {...values}
        temp[e.target.name] = e.target.value
        setValues(temp)
        // if (validateOnChange)
        //     validate([e.target.name] = e.target.value)
    };
    const handleDetailChange = (e, i) => {
        let temp = {...values}
        temp.details[i][e.target.name] = e.target.value
        setValues(temp)

    };
    const handleSelectReplaceChange = (e, i) => {
        let temp = {...values}
        // let copy = {...item}
        temp.details[i][e.target.name] = e.target.value
        setSelectValue(temp.details[i][e.target.value] = e.target.value)
        setValues(temp)
    };


    const handleInputChange = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
        if (validateOnChange)
            validate({[name]: value})
    }

    const resetForm = () => {
        setValues(initialValues);
        setErrors({})
    }


    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        handleValuesChange,
        handleDetailChange,
        handleSelectReplaceChange,
        resetForm
    }
}


export function Form(props) {

    const {children, ...other} = props;

    return (
        <form autoComplete="off" {...other}>
            {props.children}
        </form>
    )
}