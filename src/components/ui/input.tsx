import * as React from 'react';

import { Input as InputPrimitive } from '@base-ui/react/input';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        'border-input bg-background text-foreground placeholder:text-muted-foreground h-10 w-full rounded-lg border px-3 text-sm transition-[border-color,box-shadow] duration-200 outline-none',
        'focus-visible:[box-shadow:var(--shadow-focus)]',
        'disabled:bg-input/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-invalid:ring-3',
        'dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
