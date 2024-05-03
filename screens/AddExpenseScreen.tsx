import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useExpenseContext } from "../store/ExpenseContext";
import ExpenseInputModal from "../modals/ExpenseInputModal";
import CustomButton from "../components/CustomButton";

export default function AddExpenseScreen() {
  const { dispatch } = useExpenseContext();
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddExpense = async (expense: {
    title: string;
    amount: string;
  }) => {
    try {
      const response = await fetch(
        "https://expense-tracker-backend-6bpy.onrender.com/expenses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(expense),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add expense");
      }

      const data = await response.json();
      dispatch({ type: "ADD_EXPENSE", payload: data });
      setModalVisible(false);
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Add a New Expense</Text>
        <CustomButton
          title="Add Transactions"
          onPress={() => setModalVisible(true)}
        />
      </View>
      <ExpenseInputModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddExpense={handleAddExpense}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F7F7",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#112D4E",
  },
});
