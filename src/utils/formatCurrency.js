/**
 * Formats a numeric value or price string into Indian Rupee (INR - ₹)
 * using standard Indian numbering format (e.g. ₹2,50,000).
 */
export const formatINR = (amount) => {
  if (typeof amount !== 'number') {
    const parsed = parseFloat(String(amount).replace(/[^0-9.]/g, ''));
    if (isNaN(parsed)) return amount;
    amount = parsed;
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const inrBudgetOptions = [
  '₹5,000 – ₹10,000',
  '₹10,000 – ₹25,000',
  '₹25,000 – ₹50,000',
  '₹50,000+'
];
