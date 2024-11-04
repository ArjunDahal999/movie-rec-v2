"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormSuccessMessage } from "@/components/auth/FormSuccessMessage"
import { FormErrorMessage } from "@/components/auth/FormErrorMessage"
import { registerFormSchema } from "@/schema/authSchema/register-schema"
import
{
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { registerAccount } from "@/actions/authAction/userAuthAction"


const RegisterForm = () =>
{
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            email: "",
            password: '',
            username: ''
        },
    })

    const onSubmit = async (data: z.infer<typeof registerFormSchema>) =>
    {
        registerAccount(data).then((data) =>
        {
            if (data.success)
            {
                form.reset()
                setSuccessMessage(data.message)
                setErrorMessage('')
            } else
            {
                setErrorMessage(data.message)
                setSuccessMessage('')
            }
        }).finally
        {
            setIsLoading(false)
        }

    }



    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">


                {/* username container */}
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your username" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

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
                {/* passoword container */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input disabled={isLoading} type="password" placeholder="*******" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* display the message accordingly after action*/}

                {successMessage && <FormSuccessMessage message={successMessage} />}
                {errorMessage && <FormErrorMessage message={errorMessage} />}

                <Button disabled={isLoading} className=" w-full" variant={'outline'} type="submit">Register</Button>
            </form>
        </Form>
    )
}

export default RegisterForm