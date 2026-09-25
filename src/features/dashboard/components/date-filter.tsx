import React from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { DashboardPeriod, RangeType } from '@/features/dashboard/types/analytics.types.ts';
import DatePicker from '@/shared/components/date-picker.tsx';

type PropsType = {
  value: string;
  onChange: (value: DashboardPeriod) => void;
  customRange: RangeType;
  setCustomRange: (value: RangeType) => void;
};

const DateFilter: React.FC<PropsType> = ({ value, onChange, customRange, setCustomRange }) => {
  return (
    <div className="flex flex-col justify-between md:flex-row">
      <Tabs defaultValue="last-month" value={value} onValueChange={onChange}>
        <TabsList className="bg-foreground/3 h-auto gap-1 rounded-lg p-1">
          <TabsTrigger
            className="text-muted-foreground rounded-md px-4 py-1.5 text-sm font-medium transition-all"
            value="this-month"
          >
            This month
          </TabsTrigger>
          <TabsTrigger
            className="text-muted-foreground rounded-md px-4 py-1.5 text-sm font-medium transition-all"
            value="last-month"
          >
            Last month
          </TabsTrigger>
          <TabsTrigger
            className="text-muted-foreground rounded-md px-4 py-1.5 text-sm font-medium transition-all"
            value="custom"
          >
            Custom
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="mt-2 md:mt-0">
        {value === 'custom' && (
          <div className="flex flex-row gap-1.5 sm:items-center">
            <div className="w-full sm:w-[180px]">
              <DatePicker
                value={customRange.dateFrom}
                onChange={(date) => date && setCustomRange({ ...customRange, dateFrom: date })}
              />
            </div>

            <span className="text-muted-foreground hidden px-1 text-sm sm:inline">—</span>

            <div className="w-full sm:w-[180px]">
              <DatePicker
                value={customRange.dateTo}
                onChange={(date) => date && setCustomRange({ ...customRange, dateTo: date })}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(DateFilter);
