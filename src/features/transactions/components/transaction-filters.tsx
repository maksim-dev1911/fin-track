import React from 'react';

import { Card, CardContent } from '@/components/ui/card.tsx';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import DataPicker from '@/shared/components/data-picker.tsx';

const TransactionFilters = () => {
  return (
    <Card>
      <CardContent className="grid gap-4 lg:grid-cols-5">
        <div>
          <Label className="text-muted-foreground mb-2 text-xs">Type</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All types" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="All types">All types</SelectItem>
              <SelectItem value="Income">Income</SelectItem>
              <SelectItem value="Expense">Expense</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-muted-foreground mb-2 text-xs">Categories</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="All categories">All categories</SelectItem>
              <SelectItem value="Rent">Rent</SelectItem>
              <SelectItem value="Shopping">Shopping</SelectItem>
              <SelectItem value="Food">Food</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-muted-foreground mb-2 text-xs">Account</Label>

          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All accounts" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="All accounts">All accounts</SelectItem>
              <SelectItem value="checking">Checking</SelectItem>
              <SelectItem value="savings">Savings</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-muted-foreground mb-2 text-xs">From</Label>
          <DataPicker />
        </div>
        <div>
          <Label className="text-muted-foreground mb-2 text-xs">To</Label>
          <DataPicker />
        </div>
      </CardContent>
    </Card>
  );
};

export default React.memo(TransactionFilters);
