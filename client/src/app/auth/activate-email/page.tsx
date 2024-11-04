
import FormWrapper from '@/components/auth/FormWrapper'
import React from 'react'
import ActivateAccountForm from './components/activate-form'


const ActivateAccountPage = () =>
{

    return (
        <FormWrapper
            headerLable='Account Activation'
            backButtonHref='/auth/login'
            backButtonLabel='Already Have an Activated Account ?'
        >

            < ActivateAccountForm />
        </FormWrapper>
    )
}

export default ActivateAccountPage