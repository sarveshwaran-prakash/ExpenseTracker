import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  ReactNode,
} from "react";

interface Expense {
  id: string;
  title: string;
  amount: string;
  selectedType: string;
  selectedDate: string;
}

interface State {
  expenses: Expense[];
}

interface Action {
  type: string;
  payload: any;
}

interface ContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const ExpenseContext = createContext<ContextType | undefined>(undefined);

const initialState: State = {
  expenses: [],
};

const expenseReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_EXPENSE":
      console.log("dispatch add", action.payload);
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case "DELETE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload
        ),
      };
    case "SET_EXPENSES":
      return {
        ...state,
        expenses: action.payload.expenses,
      };

    default:
      return state;
  }
};

export const ExpenseProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(
          "https://expense-tracker-backend-6bpy.onrender.com/expenses"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch expenses");
        }
        const data: Expense[] = await response.json();
        console.log("initially fetched", data);
        dispatch({ type: "SET_EXPENSES", payload: { expenses: data } });
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <ExpenseContext.Provider value={{ state, dispatch }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenseContext = (): ContextType => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpenseContext must be used within an ExpenseProvider");
  }
  return context;
};
