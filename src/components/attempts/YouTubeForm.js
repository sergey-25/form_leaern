import React, {useState} from 'react'
import {
    Formik,
    Form,
    Field,
    ErrorMessage,
    FieldArray,
    FastField
} from 'formik'
import * as Yup from 'yup'
import TextError from './TextError'
import {Button} from "@mui/material";
import OrdersList from "./OrdersList";

const initialValues = {
    name: '',
    email: '',
    channel: '',
    comments: '',
    address: '',
    social: {
        facebook: '',
        twitter: ''
    },
    phoneNumbers: ['', ''],
    phNumbers: ['']
}

const savedValues = {
    name: 'Vishwas',
    email: 'v@example.com',
    channel: 'codevolution',
    comments: 'Welcome to Formik',
    address: '221B Baker Street',
    social: {
        facebook: '',
        twitter: ''
    },
    phoneNumbers: [{name: '', color: ''}],
    phNumbers: [{name: '', color: ''}]
}


const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string()
        .email('Invalid email format')
        .required('Required'),
    channel: Yup.string().required('Required'),
    comments: Yup.string().required('Required')
})

const validateComments = value => {
    let error
    if (!value) {
        error = 'Required'
    }
    return error
}

function YoutubeForm() {
    const [formValues, setFormValues] = useState([])

    const addItem = () => {
        setFormValues(...formValues)
        console.log(formValues)
    }

    const onSubmit = (values, submitProps) => {

        setFormValues([formValues])
        console.log(formValues)

        submitProps.setSubmitting(false)
        submitProps.resetForm()
    }
    // console.log(formValues)
    return (
        <div>
            <Formik
                initialValues={formValues || initialValues}
                // validationSchema={validationSchema}
                onSubmit={onSubmit}
                enableReinitialize
                // validateOnChange={false}
                // validateOnBlur={false}
                // validateOnMount
            >
                {formik => {

                    return (
                        <Form>
                            <div className='form-control'>
                                <label htmlFor='name'>Name</label>
                                <Field type='text' id='name' name='name'/>
                                <ErrorMessage name='name' component={TextError}/>
                            </div>
                            <Button onClick={addItem}>oooo</Button>
                            <div className='form-control'>
                                <label htmlFor='email'>Email</label>
                                <Field type='email' id='email' name='email'/>
                                <ErrorMessage name='email'>
                                    {error => <div className='error'>{error}</div>}
                                </ErrorMessage>
                            </div>

                            <div className='form-control'>
                                <label htmlFor='channel'>Channel</label>
                                <Field
                                    type='text'
                                    id='channel'
                                    name='channel'
                                    placeholder='YouTube channel name'
                                />
                                <ErrorMessage name='channel'/>
                            </div>

                            <div className='form-control'>
                                <label htmlFor='comments'>Comments</label>
                                <Field
                                    as='textarea'
                                    id='comments'
                                    name='comments'
                                    // validate={validateComments}
                                />
                                <ErrorMessage name='comments' component={TextError}/>
                            </div>

                            <div className='form-control'>
                                <label htmlFor='address'>Address</label>
                                <FastField name='address'>
                                    {({field, form, meta}) => {

                                        return (
                                            <div>
                                                <input type='text' {...field} />
                                                {meta.touched && meta.error ? (
                                                    <div>{meta.error}</div>
                                                ) : null}
                                            </div>
                                        )
                                    }}
                                </FastField>
                            </div>

                            <div className='form-control'>
                                <label htmlFor='facebook'>Facebook profile</label>
                                <Field type='text' id='facebook' name='social.facebook'/>
                            </div>

                            <div className='form-control'>
                                <label htmlFor='twitter'>Twitter profile</label>
                                <Field type='text' id='twitter' name='social.twitter'/>
                            </div>

                            <div className='form-control'>
                                <label htmlFor='primaryPh'>Primary phone number</label>
                                <Field type='text' id='primaryPh' name='phoneNumbers[0]'/>
                            </div>

                            <div className='form-control'>
                                <label htmlFor='secondaryPh'>Secondary phone number</label>
                                <Field type='text' id='secondaryPh' name='phoneNumbers[1]'/>
                            </div>

                            <div className='form-control'>
                                <label>List of phone numbers</label>
                                {/*<FieldArray name='phNumbers'>*/}
                                {/*    {fieldArrayProps => {*/}
                                {/*        const { push, remove, form } = fieldArrayProps*/}
                                {/*        const { values } = form*/}
                                {/*        const { phNumbers } = values*/}
                                {/*        return (*/}
                                {/*            <div>*/}
                                {/*                {phNumbers.map((phNumber, index) => (*/}
                                {/*                    <div key={index}>*/}
                                {/*                        <Field name={`phNumbers[${index}]name`} />*/}
                                {/*                        <Field name={`phNumbers[${index}]color`} />*/}
                                {/*                        {index > 0 && (*/}
                                {/*                            <button type='button' onClick={() => remove(index)}>*/}
                                {/*                                -*/}
                                {/*                            </button>*/}
                                {/*                        )}*/}
                                {/*                    </div>*/}
                                {/*                ))}*/}
                                {/*                <button type='button' onClick={() => push([{name: '', color:''}])}>*/}
                                {/*                    +*/}
                                {/*                </button>*/}
                                {/*            </div>*/}
                                {/*        )*/}
                                {/*    }}*/}
                                {/*</FieldArray>*/}
                            </div>

                            <button type='button' onClick={() => setFormValues(savedValues)}>
                                Load saved data
                            </button>
                            <button type='reset'>Reset</button>
                            <button
                                type='submit'

                                // disabled={!formik.isValid || formik.isSubmitting}
                            >
                                Submit
                            </button>
                        </Form>
                    )
                }}
            </Formik>


            <OrdersList

                formValues={formValues}
                setFormValues={setFormValues}
            />
        </div>


    )
}

export default YoutubeForm
