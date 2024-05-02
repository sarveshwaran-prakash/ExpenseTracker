import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import { useExpenseContext } from "../store/ExpenseContext";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import ExpenseModal from "../modals/ExpenseModal";
import ExpenseList from "../components/ExpenseList";
import { computeTotalAll, computeTotalAmount } from "../utils/ExpenseUtils";
import { filterExpenses, hasNoData } from "../utils/FilterUtils";

interface Expense {
  id: string;
  title: string;
  amount: string;
  selectedType: string;
  selectedDate: string;
}

const ViewExpensesScreen: React.FC = () => {
  const { state, dispatch } = useExpenseContext();
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [filter, setFilter] = useState<string>(""); // State to hold the filter type

  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    React.useCallback(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
      return () => {
        fadeAnim.setValue(0);
      };
    }, [])
  );

  useEffect(() => {
    setFilteredExpenses(filterExpenses(state.expenses, filter));
  }, [state.expenses, filter]);

  const handleDeleteExpense = async (id: string) => {
    try {
      const response = await fetch(
        `https://expense-tracker-backend-6bpy.onrender.com/expenses/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        dispatch({ type: "DELETE_EXPENSE", payload: id });
        setModalVisible(false);
      } else {
        throw new Error("Failed to delete expense");
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleEditExpense = async (
    editedExpense: string,
    editedAmount: string,
    editedSelectedType: string,
    editedSelectedDate: string
  ) => {
    try {
      if (!selectedExpense) {
        throw new Error("Expense not found");
      }

      const updatedExpense: Expense = {
        ...selectedExpense,
        title: editedExpense,
        amount: editedAmount,
        selectedType: editedSelectedType,
        selectedDate: editedSelectedDate,
      };

      const response = await fetch(
        `https://expense-tracker-backend-6bpy.onrender.com/expenses/${selectedExpense.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedExpense),
        }
      );

      if (response.ok) {
        const updatedExpenses: Expense[] = state.expenses.map((expense) =>
          expense.id === selectedExpense.id ? updatedExpense : expense
        );
        dispatch({
          type: "SET_EXPENSES",
          payload: { expenses: updatedExpenses },
        });
        setModalVisible(false);
      } else {
        throw new Error("Failed to update expense");
      }
    } catch (error: any) {
      console.error("Error updating expense:", error.message);
    }
  };

  const handleExpenseOptionPress = (expense: Expense) => {
    setSelectedExpense(expense);
    setModalVisible(true);
  };

  const handleFilter = (type: string) => {
    setFilter(type);
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.content}>
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[styles.filterButton, filter === "" && styles.activeFilter]}
            onPress={() => handleFilter("")}
          >
            <Text style={styles.filterButtonText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === "Income" && styles.activeFilter,
            ]}
            onPress={() => handleFilter("Income")}
          >
            <Text style={styles.filterButtonText}>Income</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === "Expense" && styles.activeFilter,
            ]}
            onPress={() => handleFilter("Expense")}
          >
            <Text style={styles.filterButtonText}>Expense</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Transactions</Text>
        {hasNoData(filteredExpenses, filter) && <Text>No data available</Text>}
        {filteredExpenses.length > 0 && (
          <ExpenseList
            expenses={filteredExpenses}
            handleExpenseOptionPress={handleExpenseOptionPress}
            handleDeleteExpense={handleDeleteExpense}
          />
        )}
        {filteredExpenses.length > 0 && filter === "" && (
          <View style={styles.totalContainer}>
            <Text style={styles.total}>
              Income: {computeTotalAmount(filteredExpenses, "Income")}
            </Text>
            <Text style={styles.total}>
              Expense: {computeTotalAmount(filteredExpenses, "Expense")}
            </Text>
            <Text style={styles.total}>
              Total: {computeTotalAll(filteredExpenses)}
            </Text>
          </View>
        )}
      </View>
      {selectedExpense && (
        <ExpenseModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          initialExpense={selectedExpense ? selectedExpense.title : ""}
          initialAmount={selectedExpense ? selectedExpense.amount || "" : ""}
          initialSelectedType={
            selectedExpense ? selectedExpense.selectedType || "" : ""
          }
          initialSelectedDate={
            selectedExpense ? selectedExpense.selectedDate || "" : ""
          }
          onEdit={handleEditExpense}
          onDelete={() =>
            handleDeleteExpense(selectedExpense ? selectedExpense.id : "")
          }
        />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F7F7",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#112D4E",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    // borderWidth: 0.5,
    borderRadius: 5,
    backgroundColor: "#D2DAFF",
  },
  filterButtonText: {
    fontWeight: "bold",
  },
  activeFilter: {
    backgroundColor: "#3F72AF",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  total: {
    fontWeight: "bold",
    marginRight: 20,
    color: "#112D4E",
  },
});

export default ViewExpensesScreen;
