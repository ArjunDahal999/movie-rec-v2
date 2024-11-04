"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";

import
{
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormSuccessMessage } from "@/components/auth/FormSuccessMessage";
import { FormErrorMessage } from "@/components/auth/FormErrorMessage";
import { useState, Suspense } from "react";
import { ResetPasswordFormSchema } from "@/schema/authSchema/resetpassword-schema";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPassword } from "@/actions/authAction/userAuthAction";
import { toast } from "sonner";

const ResetPasswordForm = () =>
{
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordFormContents />
        </Suspense>
    );
}

const ResetPasswordFormContents = () =>
{
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const token = searchParams.get('token');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof ResetPasswordFormSchema>>({
        resolver: zodResolver(ResetPasswordFormSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: ""
        },
    });

    function onSubmit(values: z.infer<typeof ResetPasswordFormSchema>)
    {
        const data = {
            ...values,
            email,
            token
        };
        resetPassword(data).then((data) =>
        {
            if (data.success)
            {
                toast.success("Password Reset Successfully");
                setSuccessMessage(data.message);
                router.push('/auth/login');
            } else
            {
                setErrorMessage(data.message);
            }
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* new container */}
                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <Input autoComplete="new-password" type="password" disabled={isLoading} placeholder="********" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* password container */}
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input autoComplete="confirm-password" disabled={isLoading} type="password" placeholder="********" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* display the message accordingly after action*/}
                <FormSuccessMessage message={successMessage} />
                <FormErrorMessage message={errorMessage} />
                <Button disabled={isLoading} className=" w-full" variant={'outline'} type="submit">Confirm Reset Password</Button>
            </form>
        </Form>
    );
}

export default ResetPasswordForm;
