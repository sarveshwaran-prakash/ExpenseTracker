import React, { useState } from "react";
import {
  Modal,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
} from "react-native";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomButton from "../components/CustomButton";

const { width, height } = Dimensions.get("window");

interface ExpenseInputModalProps {
  visible: boolean;
  onClose: () => void;
  onAddExpense: (expense: {
    title: string;
    amount: string;
    selectedType: string;
    selectedDate: string | null;
  }) => void;
}

const ExpenseInputModal: React.FC<ExpenseInputModalProps> = ({
  visible,
  onClose,
  onAddExpense,
}) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedType, setSelectedType] = useState("Income");

  const handleAddExpense = () => {
    const formattedDate = selectedDate
      ? new Date(selectedDate).toDateString()
      : null;
    onAddExpense({ title, amount, selectedType, selectedDate: formattedDate });
    setTitle("");
    setAmount("");
  };
  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
    }
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const clearDate = () => {
    setSelectedDate(null);
  };

  const placeholderText =
    selectedType === "Expense"
      ? "Enter expense description"
      : "Enter income description";

  const buttonTitle = selectedType === "Income" ? "Add Income" : "Add Expense";

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.modalView}>
          <View style={styles.switchContainer}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                selectedType === "Income" && styles.selectedTypeButton,
              ]}
              onPress={() => setSelectedType("Income")}
            >
              <Text style={styles.buttonText}>Income</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeButton,
                selectedType === "Expense" && styles.selectedTypeButton,
              ]}
              onPress={() => setSelectedType("Expense")}
            >
              <Text style={styles.buttonText}>Expense</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <FontAwesome name="times" size={24} color="black" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder={placeholderText}
          />
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={(text) => {
              const numericValue = text.replace(/[^0-9.]/g, "");
              const decimalValue = numericValue.replace(/(\..*)\./g, "$1");
              setAmount(decimalValue);
            }}
            placeholder="Enter amount"
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
                value={selectedDate ? selectedDate.toDateString() : ""}
              />
              <MaterialIcons name="event" size={24} color="black" />
            </TouchableOpacity>
            {selectedDate && (
              <TouchableOpacity style={styles.clearButton} onPress={clearDate}>
                <Ionicons name="close" size={20} color="gray" />
              </TouchableOpacity>
            )}
            {showDatePicker && (
              <DateTimePicker
                value={selectedDate || new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>
          <CustomButton
            title={buttonTitle}
            onPress={handleAddExpense}
            disabled={title.trim() === "" || amount.trim() === ""}
            selectedType={selectedType}
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
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  typeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#ccc",
  },
  selectedTypeButton: {
    backgroundColor: "#3F72AF",
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
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
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ExpenseInputModal;
