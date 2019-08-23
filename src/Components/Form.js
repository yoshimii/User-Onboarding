import React, {useState, useEffect} from 'react';
import {Form, withFormik, Field, yupToFormErrors} from "formik";
import * as Yup from 'yup';
import Axios from 'axios';
import {conditionalExpression} from '@babel/types';


const UserForm = ({errors, touched, values, status}) => {

    const [users, setUsers] = useState([]);
    console.log(users);

    useEffect(() => {
        if (status) {
            setUsers([
                ...users,
                status
            ])
        }
    }, [status]);
    return([
        <div className='new-users'>
            <header className='form-header'>Enter a new user:</header>
            <Form><label forHTML='name'/>
                <Field name='name' placeholder='Name' type='text'/> {/* form validation */}
                {
                touched.name && errors.name && (
                    <p className='error'>
                        {
                        errors.name
                    }</p>
                )
            }   <label forHTML='email'/>
                <Field name='email' placeholder='e-mail' type='email'/> {/* form validation */}
                {
                touched.email && errors.email && (
                    <p className='error'>
                        {
                        errors.email
                    }</p>
                )
            }   <label forHTML='password'/>
                <Field name='password' placeholder='password' type='text'/> {/* form validation */}
                {
                touched.password && errors.password && (
                    <p className='error'>
                        {
                        errors.password
                    }</p>
                )
            }
                <label forHTML='terms'>
                    <p className='terms'>Terms of Service</p>
                    <Field name='terms' type='checkbox'
                        checked={
                            values.terms
                        }
                        placeholder='Terms of Service'/> {/* form validation */}
                    {
                    touched.terms && errors.terms && (
                        <p className='error'>
                            {
                            errors.terms
                        }</p>
                    )
                } </label>

                <button type='submit'>Submit</button>
            </Form>
            {
            users.map(user => (
                <p key={
                    user.id
                }>
                    {
                    user.name
                }</p>
            ))
        } </div>
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
        {
            name: Yup.string().required(),
            email: Yup.string().required(),
            password: Yup.string().required(),
            terms: Yup.boolean().oneOf([true], <p className='terms'>'Must accept Terms and Conditions.'</p>)
        }
    ),
    handleSubmit(values, {setStatus}) {
        Axios.post('https://reqres.in/api/users', values).then(res => {
            setStatus(res.data);
            console.log(res.data) // keeping an eye on responses from api
        }).catch(err => console.log(err.response));
    }

})(UserForm) // currying

export default BetterUserForm;
