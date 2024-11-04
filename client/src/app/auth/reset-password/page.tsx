import FormWrapper from '@/components/auth/FormWrapper'
import React from 'react'
import ResetPasswordForm from './components/reset-password-form'


const ResetPasswordPage = () =>
{
    return (
        <FormWrapper
            backButtonHref='/auth/login'
            backButtonLabel='Back to Login'
            headerLable='Reset Your Password'
        >
            <ResetPasswordForm />
        </FormWrapper>
    )
}

export default ResetPasswordPage