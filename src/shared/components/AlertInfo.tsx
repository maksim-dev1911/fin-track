import React from 'react';

import { AlertCircleIcon } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.tsx';

type PropsType = {
  alertTitle: string;
  alertDescription: string;
  variant: 'default' | 'destructive';
};

const AlertInfo: React.FC<PropsType> = ({ alertDescription, alertTitle, variant }) => {
  return (
    <Alert variant={variant} className="max-w-md">
      <AlertCircleIcon />
      <AlertTitle>{alertTitle}</AlertTitle>
      <AlertDescription>{alertDescription}</AlertDescription>
    </Alert>
  );
};

export default React.memo(AlertInfo);
