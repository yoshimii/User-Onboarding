import React from 'react';
import {Form, withFormik, Field, yupToFormErrors} from "formik";
import * as Yup from 'yup';
import Axios from 'axios';

const UserForm = ({errors, touched, values}) => {
    return([
        <div>,
            <header>New Users</header>
            <Form>
                <Field name='name' placeholder='Name' type='text'/> 
                {/* form validation */}{
                touched.name && errors.name && (
                    <p className='error'>
                        {
                        errors.name
                    }</p>
                )
            }
                <Field name='email' placeholder='e-mail' type='email'/> 
                {/* form validation */}{
                touched.email && errors.email && (
                    <p className='error'>
                        {
                        errors.email
                    }</p>
                )
            }
                <Field name='password' placeholder='password' type='text'/> 
                {/* form validation */}{
                touched.password && errors.password && (
                    <p className='error'>
                        {
                        errors.password
                    }</p>
                )
            }
                <label>
                    Terms of Service
                    <Field name='terms' type='checkbox'
                        checked={
                            values.terms
                        }
                        placeholder='Terms of Service'/> 
                        {/* form validation */}{
                    touched.terms && errors.terms && (
                        <p className='error'>
                            {
                            errors.terms
                        }</p>
                    )
                } </label>

                <button type='submit'>Submit New User</button>
            </Form>
        </div>
    ])
}

const BetterUserForm = withFormik({
    mapPropsToValues(
        {name, email, password, terms}
    ) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            terms: terms || false
        }; // return
    }, // mapPropsToValues
    validationSchema: Yup.object().shape(
        {name: Yup.string().required(), email: Yup.string().required(), password: Yup.string().required(), terms: Yup.bool().required()}
    ),
    handleSubmit(values, {setStatus}) {
        Axios.post('https://reqres.in/api/users').then(res => {
            setStatus(res.data);
        }).catch(err => console.log(err.response));
    }

})(UserForm) // currying

export default BetterUserForm;
