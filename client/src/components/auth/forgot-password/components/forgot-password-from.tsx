"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"

import
{
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormSuccessMessage } from "@/components/auth/FormSuccessMessage"
import { FormErrorMessage } from "@/components/auth/FormErrorMessage"
import { useState } from "react"
import { ForgotPasswordFormSchema } from "@/schema/authSchema/forgotpassword-schema"
import { forgotPassword } from "@/actions/authAction/userAuthAction"



const ForgotPasswordForm = () =>
{

    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof ForgotPasswordFormSchema>>({
        resolver: zodResolver(ForgotPasswordFormSchema),
        defaultValues: {
            email: "",
        },
    })

    function onSubmit(values: z.infer<typeof ForgotPasswordFormSchema>)
    {
        setIsLoading(true)
        forgotPassword(values).then((data) =>
        {
            if (data.success)
            {
                form.reset()
                setSuccessMessage(data.message)
                setErrorMessage('')
            } else
            {
                console.log(data)
                setErrorMessage(data.message)
                setSuccessMessage('')
            }
        }).finally
        {
            setIsLoading(false)
        }
    }



    return (
        <>
            <h1 className=" text-sm my-2 text-slate-400">Reset Password Link will be sent to your inbox</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    {/* email container */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input disabled={isLoading} placeholder="Enter your Email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormSuccessMessage message={successMessage} />
                    <FormErrorMessage message={errorMessage} />
                    <Button disabled={isLoading} className=" w-full" variant={'outline'} type="submit">Submit</Button>
                </form>
            </Form>
        </>
    )
}

export default ForgotPasswordForm