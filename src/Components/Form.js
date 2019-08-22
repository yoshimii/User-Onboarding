import React from 'react';
import {Form, withFormik, Field} from "formik";

const UserForm = () => {
    return([
        <div>,
            <header>New Users</header>
            <Form>
                <Field name='name' placeholder='Name' type='text'/>
                <Field name='email' placeholder='e-mail' type='email'/>
                <Field name='password' placeholder='password' type='text'/>
                <label>
                    Terms of Service
                    <Field name='terms' placeholder='Terms of Service' type='checkbox'/>
                </label>

                <button>Submit New User</button>
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
    }

})(UserForm)

export default BetterUserForm;
