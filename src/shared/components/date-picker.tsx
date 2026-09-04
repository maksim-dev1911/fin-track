import React from 'react';

import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button.tsx';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';

type PropsType = {
  value?: Date;
  onChange: (date: Date | undefined) => void;
};

const DatePicker: React.FC<PropsType> = ({ value, onChange }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant={'outline'}
            data-empty={!value}
            className="w-full justify-between py-5 text-left font-normal"
          >
            {value ? value.toLocaleDateString() : <span>dd/mm/yyyy</span>}
            <ChevronDownIcon data-icon="inline-end" />
          </Button>
        }
      />
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            onChange(date);
            setOpen(false);
          }}
          defaultMonth={value}
        />
      </PopoverContent>
    </Popover>
  );
};

export default React.memo(DatePicker);
