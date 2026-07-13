import React from 'react';


import {Button} from "@/components/ui/button.tsx";
import {Field, FieldLabel} from "@/components/ui/field.tsx";
import {Input} from "@/components/ui/input.tsx";
import type {LoginFormType} from "@/features/auth/schemas/login.schema.ts";

import {useLoginForm} from '../hooks/use-login-form';

const LoginForm = () => {
    const form = useLoginForm();

    const onSubmit = (data: LoginFormType) => {
        console.log(data);
    }

    return (
        <div>
            <h3 className="font-semibold text-2xl">Welcome back</h3>
            <p className="text-[#64748b] text-sm mt-1">Sign in to continue tracking your finances</p>
            <div className="flex justify-center w-full mt-4">
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-5">
                        <Field className="min-w-[360px]">
                            <FieldLabel>Email</FieldLabel>
                            <Input
                                type='email'
                                placeholder="email@gmail.com"
                                aria-invalid={!!form.formState.errors.email}
                                {...form.register('email')}/>
                            {form.formState.errors.email && (
                                <p className="mt-1 text-sm text-red-500">
                                    {form.formState.errors.email.message}
                                </p>
                            )}
                        </Field>
                        <Field>
                            <FieldLabel>Password</FieldLabel>
                            <Input
                                type="password"
                                placeholder="********"
                                aria-invalid={!!form.formState.errors.password}
                                {...form.register('password')}
                            />
                            {form.formState.errors.password && (
                                <p className="mt-1 text-sm text-red-500">
                                    {form.formState.errors.password.message}
                                </p>
                            )}
                        </Field>
                        <Field orientation="horizontal" className="w-full">
                            <Button type="submit" size="lg" className="w-full bg-[#7c3aed]">Sign In</Button>
                        </Field>
                        <div className="flex justify-center items-center gap-2 font-medium text-sm">
                            <p className="text-[#64748b]">Don't have an account?</p>
                            <a href='/' className="text-[#7c3aed]">
                                Create one
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default React.memo(LoginForm);