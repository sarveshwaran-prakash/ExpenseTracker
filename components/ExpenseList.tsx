import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";

export interface Expense {
  id: string;
  title: string;
  amount: string;
  selectedType: string;
  selectedDate: string;
}

interface ExpenseListProps {
  expenses: Expense[];
  handleExpenseOptionPress: (expense: Expense) => void;
  handleDeleteExpense: (id: string) => void;
}

const { width } = Dimensions.get("window");

const ExpenseList: React.FC<ExpenseListProps> = ({
  expenses,
  handleExpenseOptionPress,
}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {expenses.map((expense) => (
        <TouchableWithoutFeedback
          key={expense.id}
          onLongPress={() => handleExpenseOptionPress(expense)}
        >
          <View style={[styles.expense]}>
            <View style={styles.expenseContent}>
              <Text numberOfLines={1} style={styles.title}>
                {expense.title}
              </Text>
              {expense.selectedDate && (
                <Text numberOfLines={1} style={styles.amount}>
                  {new Date(expense.selectedDate).toDateString()}
                </Text>
              )}
            </View>
            <Text
              style={[
                styles.title,
                expense.selectedType === "Expense"
                  ? styles.expenseExpenseType
                  : styles.expenseIncomeType,
              ]}
            >
              {expense.amount}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: "100%",
    paddingBottom: 20,
  },
  expense: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    borderWidth: 2,
    borderRadius: 5,
    width: width * 0.9,
    alignSelf: "center",
    borderColor: "#3F72AF",
  },
  expenseContent: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  amount: {
    fontSize: 14,
    color: "gray",
  },

  selectedType: {
    fontWeight: "bold",
    fontSize: 16,
    right: 90,
  },
  expenseExpenseType: {
    color: "red",
  },
  expenseIncomeType: {
    color: "green",
  },
});

export default ExpenseList;
