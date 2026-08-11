export const formatTransactionAmount = (cents: number, type: 'income' | 'expense') => {
  const amount = Math.abs(cents) / 100;

  return `${type === 'income' ? '+' : '-'}$${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};
