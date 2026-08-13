export const formatTransactionAmount = (
  cents: number,
  type: 'income' | 'expense' | 'default',
  options?: {
    hideDecimals?: boolean;
  },
) => {
  const amount = Math.abs(cents) / 100;

  return `${type === 'income' ? '+' : type === 'expense' ? '-' : ''}$${amount.toLocaleString(
    'en-US',
    {
      minimumFractionDigits: options?.hideDecimals ? 0 : 2,
      maximumFractionDigits: options?.hideDecimals ? 0 : 2,
    },
  )}`;
};
