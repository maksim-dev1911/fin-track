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
    <div className="flex justify-between">
      <Tabs defaultValue="last-month" value={value} onValueChange={onChange}>
        <TabsList className="h-auto gap-1 rounded-lg bg-[#F0F2F6] p-1">
          <TabsTrigger
            className="text-muted-foreground data-[state=active]:text-foreground rounded-md px-4 py-1.5 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm"
            value="this-month"
          >
            This month
          </TabsTrigger>
          <TabsTrigger
            className="text-muted-foreground data-[state=active]:text-foreground rounded-md px-4 py-1.5 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm"
            value="last-month"
          >
            Last month
          </TabsTrigger>
          <TabsTrigger
            className="text-muted-foreground data-[state=active]:text-foreground rounded-md px-4 py-1.5 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm"
            value="custom"
          >
            Custom
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div>
        {value === 'custom' && (
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center">
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
