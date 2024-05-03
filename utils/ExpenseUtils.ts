import { Expense } from "../components/ExpenseList";

export const computeTotalAmount = (
  expenses: Expense[],
  type: string
): number => {
  const totalAmount = expenses
    .filter((expense) => expense.selectedType === type)
    .reduce((total, expense) => {
      const amount = parseFloat(expense.amount || "0");
      return type === "Income" ? total + amount : total + Math.abs(amount);
    }, 0);
  return Number(totalAmount.toFixed(2));
};

export const computeTotalAll = (expenses: Expense[]): number => {
  const totalIncome = computeTotalAmount(expenses, "Income");
  const totalExpense = computeTotalAmount(expenses, "Expense");
  const total = totalIncome - totalExpense;
  return Number(total.toFixed(2));
};
