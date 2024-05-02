import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  selectedType?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.buttonText, disabled && styles.disabledButtonText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#3F72AF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: "lightgray",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  disabledButtonText: {
    color: "black",
    opacity: 0.7,
  },
});

export default CustomButton;
