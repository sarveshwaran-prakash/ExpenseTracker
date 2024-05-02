import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ExpenseProvider } from "./store/ExpenseContext";
import AddExpenseScreen from "./screens/AddExpenseScreen";
import ViewExpensesScreen from "./screens/ViewExpensesScreen";
import Icon from "react-native-vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ExpenseProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color }) => {
              let iconName;

              if (route.name === "Add Transactions") {
                iconName = "plus";
              } else if (route.name === "View Transactions") {
                iconName = "list";
              }

              if (iconName) {
                return <Icon name={iconName} color={color} size={26} />;
              }

              return null;
            },
            tabBarActiveTintColor: "#3F72AF",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: {
              backgroundColor: "#DBE2EF",
            },
            tabBarLabelStyle: {
              color: "black",
              fontSize: 15,
              fontWeight: "600",
            },
          })}
        >
          <Tab.Screen
            name="Add Transactions"
            component={AddExpenseScreen}
            options={() => ({
              headerStyle: { backgroundColor: "#DBE2EF" },
            })}
          />
          <Tab.Screen
            name="View Transactions"
            component={ViewExpensesScreen}
            options={() => ({
              headerStyle: { backgroundColor: "#DBE2EF" },
            })}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ExpenseProvider>
  );
}
