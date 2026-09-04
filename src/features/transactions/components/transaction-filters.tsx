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
import { useAccountsQuery } from '@/features/accounts/hooks/use-accounts-query.ts';
import { useCategoriesQuery } from '@/features/categories/hooks/use-categories-query.ts';
import type {
  TransactionFiltersState,
  TransactionType,
} from '@/features/transactions/types/transaction.types.ts';
import DatePicker from '@/shared/components/date-picker.tsx';
import { formatDateLocal } from '@/shared/lib/format-date.ts';

type PropsType = {
  filters: TransactionFiltersState;
  onChange: (filters: TransactionFiltersState) => void;
};

const TYPE_LABELS: Record<string, string> = {
  all: 'All types',
  income: 'Income',
  expense: 'Expense',
};

const TransactionFilters: React.FC<PropsType> = ({ filters, onChange }) => {
  const { data: accounts = [] } = useAccountsQuery();
  const { data: categories = [] } = useCategoriesQuery();

  return (
    <Card>
      <CardContent className="grid gap-4 lg:grid-cols-5">
        <div>
          <Label className="text-muted-foreground mb-2 text-xs">Type</Label>
          <Select
            value={filters.type ?? 'all'}
            onValueChange={(value) => {
              onChange({
                ...filters,
                type: value === 'all' ? undefined : (value as TransactionType),
              });
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All types">
                {(value: string) => TYPE_LABELS[value] ?? 'All types'}
              </SelectValue>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-muted-foreground mb-2 text-xs">Categories</Label>
          <Select
            value={filters.categoryId ?? 'All categories'}
            onValueChange={(value) => {
              onChange({
                ...filters,
                categoryId: value === 'all' ? undefined : (value as TransactionType),
              });
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All categories">
                {(value: string) =>
                  categories.find((c) => c.id === value)?.name ?? 'All categories'
                }
              </SelectValue>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((c) => (
                <SelectItem value={c.id} key={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-muted-foreground mb-2 text-xs">Account</Label>

          <Select
            value={filters.accountId ?? 'all'}
            onValueChange={(value) => {
              onChange({
                ...filters,
                accountId: value === 'all' ? undefined : (value as TransactionType),
              });
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All accounts">
                {(value: string) => accounts.find((a) => a.id === value)?.name ?? 'All accounts'}
              </SelectValue>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All accounts</SelectItem>
              {accounts.map((a) => (
                <SelectItem value={a.id} key={a.id}>
                  {a.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-muted-foreground mb-2 text-xs">From</Label>
          <DatePicker
            value={filters.dateFrom ? new Date(filters.dateFrom) : undefined}
            onChange={(date) => {
              onChange({
                ...filters,
                dateFrom: date ? formatDateLocal(date) : undefined,
              });
            }}
          />
        </div>
        <div>
          <Label className="text-muted-foreground mb-2 text-xs">To</Label>
          <DatePicker
            value={filters.dateTo ? new Date(filters.dateTo) : undefined}
            onChange={(date) => {
              onChange({
                ...filters,
                dateTo: date ? formatDateLocal(date) : undefined,
              });
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default React.memo(TransactionFilters);
