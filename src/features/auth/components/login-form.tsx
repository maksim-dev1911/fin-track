import React from 'react';

import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button.tsx';
import { Field, FieldError, FieldLabel } from '@/components/ui/field.tsx';
import { Input } from '@/components/ui/input.tsx';

import { useLoginForm } from '../hooks/use-login-form';

const LoginForm = () => {
  const form = useLoginForm();

  const onSubmit = () => {
    // TODO: wire up to auth mutation
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold">Welcome back</h3>
      <p className="text-muted-foreground mt-1 text-sm">
        Sign in to continue tracking your finances
      </p>
      <div className="mt-4 flex w-full justify-center">
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-[360px]">
          <div className="flex flex-col gap-5">
            <Field className="">
              <FieldLabel htmlFor="email" className="text-[13px]">
                Email
              </FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="email@gmail.com"
                aria-invalid={!!form.formState.errors.email}
                {...form.register('email')}
              />
              <FieldError>{form.formState.errors.email?.message}</FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="password" className="text-[13px]">
                Password
              </FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="********"
                aria-invalid={!!form.formState.errors.password}
                {...form.register('password')}
              />
              <FieldError>{form.formState.errors.password?.message}</FieldError>
            </Field>
            <Field orientation="horizontal" className="w-full">
              <Button type="submit" size="lg" className="bg-brand h-[42px] w-full">
                Sign In
              </Button>
            </Field>
            <div className="flex items-center justify-center gap-2 text-sm font-medium">
              <p className="text-muted-foreground">Don't have an account?</p>
              <Link to="/register" className="text-brand">
                Create one
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(LoginForm);
