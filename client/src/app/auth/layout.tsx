import React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { loginToAccount } from '@/actions/authAction/userAuthAction'
interface AuthLayoutPropsType
{
    children: React.ReactNode
}


const AuthLayout = ({ children }: AuthLayoutPropsType) =>
{
    return (
        <div className="  w-full h-full flex justify-center items-center">
            {children}
        </div>
    )
}

export default AuthLayout