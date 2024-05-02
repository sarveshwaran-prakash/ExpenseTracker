import { Expense } from "../components/ExpenseList";

export const filterExpenses = (
  expenses: Expense[],
  filter: string
): Expense[] => {
  if (filter === "") {
    return expenses;
  } else {
    return expenses.filter((expense) => expense.selectedType === filter);
  }
};

export const hasNoData = (
  filteredExpenses: Expense[],
  filter: string
): boolean => {
  return (
    filteredExpenses.length === 0 &&
    (filter === "" ||
      (filter === "Income" &&
        filteredExpenses.filter((expense) => expense.selectedType === "Income")
          .length === 0) ||
      (filter === "Expense" &&
        filteredExpenses.filter((expense) => expense.selectedType === "Expense")
          .length === 0))
  );
};
