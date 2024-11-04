"use client"
import { FormErrorMessage } from '@/components/auth/FormErrorMessage';
import { FormSuccessMessage } from '@/components/auth/FormSuccessMessage';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'; // Import Suspense
import { ScaleLoader } from "react-spinners";
import { activateAccount } from '@/actions/authAction/userAuthAction';
import { toast } from 'sonner';

const ActivateAccountForm = () =>
{
    // Wrap useSearchParams in Suspense
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ActivateFormContents />
        </Suspense>
    );
}

const ActivateFormContents = () =>
{
    const searchParams = useSearchParams();
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const router = useRouter()
    const email = searchParams.get("email");
    const token = searchParams.get("token");

    const data = {
        email,
        token
    }
    useEffect(() =>
    {
        activateAccount(data).then((data: any) =>
        {
            if (data.success)
            {
                toast.success("Account Activated")
                setSuccessMessage(data.message);
                router.push('/auth/login')

            } else
            {
                setErrorMessage(data.message);
            }
        })
    }, []);
    return (
        <>
            <div className=" flex justify-center items-center w-full">
                {!successMessage && !errorMessage && <ScaleLoader color="#36d7b7" />}
                {successMessage && <FormSuccessMessage message={successMessage} />}
                {errorMessage && <FormErrorMessage message={errorMessage} />}
            </div>
        </>
    );
}

export default ActivateAccountForm;
