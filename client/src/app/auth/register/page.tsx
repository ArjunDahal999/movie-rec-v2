import FormWrapper from '@/components/auth/FormWrapper'
import React from 'react'
import RegisterForm from './components/register-form'

const RegisterPage = () =>
{
    return (
        <FormWrapper
            backButtonHref='/auth/login'
            backButtonLabel='Already Have an account ?'
            headerLable='Register'
        >
            <RegisterForm />
        </FormWrapper>
    )
}

export default RegisterPage