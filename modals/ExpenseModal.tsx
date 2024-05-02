import React, { useState } from "react";
import { Modal, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import EditExpenseModal from "./EditExpenseModal";

interface ExpenseModalProps {
  visible: boolean;
  onClose: () => void;
  onEdit: (
    editedExpense: string,
    editedAmount: string,
    editedSelectedType: string,
    editedSelectedDate: string
  ) => void;
  onDelete: () => void;
  initialExpense: string;
  initialAmount: string;
  initialSelectedType: string;
  initialSelectedDate: string;
}

const ExpenseModal: React.FC<ExpenseModalProps> = ({
  visible,
  onClose,
  onEdit,
  onDelete,
  initialExpense,
  initialAmount,
  initialSelectedType,
  initialSelectedDate,
}) => {
  const [editModalVisible, setEditModalVisible] = useState(false);

  const handleEdit = () => {
    setEditModalVisible(true);
  };

  const handleSaveEdit = (
    editedExpense: string,
    editedAmount: string,
    editedSelectedType: string,
    editedSelectedDate: string
  ) => {
    onEdit(editedExpense, editedAmount, editedSelectedType, editedSelectedDate);
    setEditModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={handleEdit}>
              <Text style={styles.modalOption}>
                <FontAwesome name="edit" size={20} />
                Edit transaction
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete}>
              <Text style={styles.modalOption}>
                <FontAwesome name="trash" size={20} /> Delete transaction
              </Text>
            </TouchableOpacity>
            <Text>Description {initialExpense}</Text>
            <Text>Amount: {initialAmount}</Text>
          </View>
        </View>
      </TouchableOpacity>
      {editModalVisible && (
        <EditExpenseModal
          visible={editModalVisible}
          onClose={() => setEditModalVisible(false)}
          expense={initialExpense || ""}
          amount={initialAmount}
          selectedType={initialSelectedType}
          onSave={handleSaveEdit}
          selectedDate={initialSelectedDate}
        />
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "#EEF1FF",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalOption: {
    marginBottom: 20,
  },
});

export default ExpenseModal;
