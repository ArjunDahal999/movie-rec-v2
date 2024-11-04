import React from 'react'
import LoginForm from './components/login-form'
import FormWrapper from '@/components/auth/FormWrapper'
const LognPage = () =>
{

    //Todo redirect to the dashboard
    return (
        <FormWrapper
            backButtonHref='/auth/register'
            backButtonLabel="Don't have an account ?"
            headerLable='Login'
        >
            <LoginForm />
        </FormWrapper>
    )
}

export default LognPage