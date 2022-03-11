import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import useRegister from '../../customHooks/AuthHooks/useRegister'
import { register_validation } from '../../validations/auth-validator'
import FormikTextInput from '../Common/FormikTextInput'

const Register = () => {
    const { mutate: do_register, isLoading, isSuccess} = useRegister()


    if (isSuccess) return <Redirect push to='/login' />

    return (
        <div>
        
          <Formik
            initialValues={{
                first_name:'',
                last_name:'',
                email:'',
                password:'',
            }}

            validationSchema={register_validation}
            onSubmit = { async (values, {setSubmitting}) => {
                setSubmitting(false)

                const payload = {
                    first_name:values.first_name,
                    last_name:values.last_name,
                    email:values.email,
                    password:values.password
                }
                do_register(payload)
            }}
          >

            {props => (
                <Form className='login-form'>
                    <p className="menu-header text-center text-danger">Sign Up</p>

                    <FormikTextInput name='first_name' label='First Name' />
                    <FormikTextInput name='last_name' label='Last Name' />
                    <FormikTextInput placeholder={'example@email.com'} name='email' label='Email' />
                    <FormikTextInput type='password' name='password' label='Password' />

                    <br/>
                    <div className='text-center'>
                        <button className="btn btn-danger w-50" type='submit'>{props.isSubmitting ? 'Loading...' : 'Register'}</button>   
                    </div>
                    <br/>
                    <Link style={{fontSize:14, textDecoration: 'none'}} className='menu-header text-muted' to='/login'>Already have an account?</Link>
                </Form>
                )}

          </Formik>
          


        </div>
    )
}

export default Register;