import FormWrapper from '@/components/auth/FormWrapper'
import React from 'react'
import ForgotPassowordForm from './components/forgot-password-from'

const ForgotPasswordPage = () =>
{
    return (
        <FormWrapper
            headerLable='Forgot Password ?'
            backButtonHref='/auth/login'
            backButtonLabel='Back to Login'
        >
            <ForgotPassowordForm />
        </FormWrapper>
    )
}

export default ForgotPasswordPage