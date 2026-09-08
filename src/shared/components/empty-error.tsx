import React from 'react';

import { AlertCircle, RefreshCw, Wallet } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';

type PropsType = {
  refetch?: () => void;
  title: string;
  description: string;
  variant: 'error' | 'empty';
};

const EmptyError: React.FC<PropsType> = ({ refetch, title, description, variant }) => {
  return (
    <Empty className="min-h-[400px] rounded-lg border">
      <EmptyHeader>
        <EmptyMedia variant="icon">{variant === 'error' ? <AlertCircle /> : <Wallet />}</EmptyMedia>

        <EmptyTitle>{title}</EmptyTitle>

        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        {refetch && (
          <Button onClick={() => refetch()}>
            <RefreshCw />
            Try again
          </Button>
        )}
      </EmptyContent>
    </Empty>
  );
};

export default React.memo(EmptyError);
