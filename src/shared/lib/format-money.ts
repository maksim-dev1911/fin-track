export const formatTransactionAmount = (amount: number, type: 'income' | 'expense' | 'default') => {
  const absoluteAmount = Math.abs(amount);

  return `${type === 'income' ? '+' : type === 'expense' ? '-' : ''}$${absoluteAmount.toLocaleString(
    'en-US',
    {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    },
  )}`;
};
