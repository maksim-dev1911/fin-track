import React from 'react';

import type { AxiosError } from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import { routes } from '@/app/router/routes.ts';
import { Button } from '@/components/ui/button.tsx';
import { Field, FieldError, FieldLabel } from '@/components/ui/field.tsx';
import { Input } from '@/components/ui/input.tsx';
import { useRegisterForm } from '@/features/auth/hooks/use-register-form.ts';
import { useRegisterMutation } from '@/features/auth/hooks/use-register-mutation.ts';
import type { RegisterFormType } from '@/features/auth/schemas/register.schema.ts';
import { useAuthStore } from '@/features/auth/store/auth.store.ts';
import AlertInfo from '@/shared/components/AlertInfo.tsx';
import { applyServerValidationErrors } from '@/shared/lib/apply-server-validation-errors';
import { getApiErrorMessage } from '@/shared/lib/get-api-error-message.ts';
import type { ApiValidationError } from '@/shared/types/error.ts';

const RegisterForm = () => {
  const setSession = useAuthStore((state) => state.setSession);

  const form = useRegisterForm();

  const registerMutation = useRegisterMutation();

  const navigate = useNavigate();

  const onSubmit = async (values: RegisterFormType) => {
    try {
      const response = await registerMutation.mutateAsync(values);

      setSession(response);
      navigate(routes.home, { replace: true });
    } catch (error) {
      if (applyServerValidationErrors(form, error as AxiosError<ApiValidationError>)) {
        return;
      }

      throw error;
    }
  };

  return (
    <div>
      {registerMutation.isError && (
        <div className="mb-5">
          <AlertInfo
            variant="destructive"
            alertTitle="Registration failed"
            alertDescription={getApiErrorMessage(
              registerMutation.error?.response?.data?.error?.message,
            )}
          />
        </div>
      )}
      <h3 className="text-2xl font-semibold">Create account</h3>
      <p className="text-muted-foreground mt-1 text-sm">
        Start tracking your finances in under a minute
      </p>
      <div className="mt-4 flex w-full justify-center">
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-[360px]">
          <div className="flex flex-col gap-4">
            <Field>
              <FieldLabel htmlFor="name" className="text-[13px]">
                Display name
              </FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="Alex Morgan"
                aria-invalid={!!form.formState.errors.displayName}
                {...form.register('displayName')}
              />
              <FieldError>{form.formState.errors.displayName?.message}</FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="email" className="text-[13px]">
                Email
              </FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
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
                placeholder="At least 8 characters"
                aria-invalid={!!form.formState.errors.password}
                {...form.register('password')}
              />
              <FieldError>{form.formState.errors.password?.message}</FieldError>
            </Field>
            <Field orientation="horizontal" className="w-full">
              <Button
                type="submit"
                size="lg"
                disabled={!form.formState.isValid || form.formState.isSubmitting}
                className="bg-brand h-[42px] w-full"
              >
                Create account
              </Button>
            </Field>
            <div className="flex items-center justify-center gap-2 text-sm font-medium">
              <p className="text-muted-foreground">Already have an account?</p>
              <Link to="/login" className="text-brand">
                Sign in
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(RegisterForm);
