export type AnalyticByCategoryResponse = {
  categoryId: string;
  color: string;
  name: string;
  total: number;
};

export type AnalyticSummary = {
  totalBalance: number;
  periodIncome: number;
  periodExpense: number;
  periodNet: number;
};

export type DashboardPeriod = 'this-month' | 'last-month' | 'custom';

export type DateRange = {
  dateFrom: string;
  dateTo: string;
};

export type RangeType = {
  dateFrom: Date;
  dateTo: Date;
};
