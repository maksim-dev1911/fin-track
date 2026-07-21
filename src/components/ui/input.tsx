import * as React from 'react';

import { Input as InputPrimitive } from '@base-ui/react/input';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        'border-input text-foreground placeholder:text-muted-foreground h-10 w-full rounded-lg border bg-white px-3 text-sm transition-[box-shadow] duration-200 outline-none focus-visible:[box-shadow:var(--shadow-focus)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
