import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomButton from "../components/CustomButton";

const { width, height } = Dimensions.get("window");

interface EditExpenseModalProps {
  visible: boolean;
  onClose: () => void;
  expense: string;
  amount: string;
  selectedType: string;
  selectedDate: string;
  onSave: (
    expense: string,
    amount: string,
    selectedType: string,
    selectedDate: string
  ) => void;
}

const EditExpenseModal: React.FC<EditExpenseModalProps> = ({
  visible,
  onClose,
  expense: initialExpense,
  amount: initialAmount,
  selectedType: initialSelectedType,
  selectedDate: initialSelectedDate,
  onSave,
}) => {
  const [editedExpense, setEditedExpense] = useState(initialExpense || "");
  const [editedAmount, setEditedAmount] = useState(initialAmount || "");
  const [editedSelectedType, setEditedSelectedType] = useState(
    initialSelectedType || ""
  );
  const [editedSelectedDate, seteditedSelectedDate] = useState(
    initialSelectedDate || ""
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    setEditedExpense(initialExpense || "");
    setEditedAmount(initialAmount || "");
  }, [initialExpense, initialAmount]);

  const handleSave = () => {
    onSave(editedExpense, editedAmount, editedSelectedType, editedSelectedDate);
    onClose();
  };
  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const dateString = selectedDate.toISOString();
      seteditedSelectedDate(dateString);
    }
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const clearDate = () => {
    seteditedSelectedDate("");
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <FontAwesome name="times" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.switchContainer}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                editedSelectedType === "Income" && styles.selectedTypeButton,
              ]}
              onPress={() => setEditedSelectedType("Income")}
            >
              <Text style={styles.buttonText}>Income</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeButton,
                editedSelectedType === "Expense" && styles.selectedTypeButton,
              ]}
              onPress={() => setEditedSelectedType("Expense")}
            >
              <Text style={styles.buttonText}>Expense</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            value={editedExpense}
            onChangeText={setEditedExpense}
            placeholder="Update expense"
          />
          <TextInput
            style={[styles.input]}
            value={editedAmount}
            onChangeText={(text) => {
              const numericValue = text.replace(/[^0-9.]/g, "");
              const decimalValue = numericValue.replace(/(\..*)\./g, "$1");
              setEditedAmount(decimalValue);
            }}
            placeholder="Update amount"
            keyboardType="numeric"
          />
          <View style={[styles.dateContainer, styles.input]}>
            <TouchableOpacity
              style={styles.inputContainer}
              onPress={showDatePickerModal}
            >
              <TextInput
                style={styles.input}
                placeholder="Pick your date"
                editable={false}
                value={editedSelectedDate ? editedSelectedDate : ""}
              />
              <MaterialIcons name="event" size={24} color="black" />
            </TouchableOpacity>
            {editedSelectedDate && (
              <TouchableOpacity style={styles.clearButton} onPress={clearDate}>
                <Ionicons name="close" size={20} color="gray" />
              </TouchableOpacity>
            )}
            {showDatePicker && (
              <DateTimePicker
                value={
                  editedSelectedDate ? new Date(editedSelectedDate) : new Date()
                }
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>
          <CustomButton
            title="Save"
            onPress={handleSave}
            disabled={!editedExpense?.trim()}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  selectedTypeButton: {
    backgroundColor: "#3F72AF",
    borderWidth: 1,
  },
  typeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#ccc",
  },
  buttonText: {
    fontSize: 16,
  },
  modalView: {
    width: width * 0.8,
    maxHeight: height * 0.6,
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
    borderWidth: 2,
    borderColor: "#3F72AF",
    elevation: 5,
  },
  input: {
    width: "100%",
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#3F72AF",
    borderRadius: 5,
  },
  amountInput: {
    height: 100,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
  },
  clearButton: {
    marginLeft: 10,
  },
});

export default EditExpenseModal;
