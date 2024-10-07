import { v4 as uuidv4 } from "uuid";
import { DraftExpense, Expense } from "../types";
export type BudgetAction =
  | {
      type: "add-budget";
      payload: { budget: number };
    }
  | {
      type: "show-modal";
    }
  | {
      type: "close-modal";
    }
  | {
      type: "add-expense";
      payload: { expense: DraftExpense };
    }
  | {
      type: "remove-expense";
      payload: { id: Expense["id"] };
    }
  | {
      type: "get-expense-by-id";
      payload: { id: Expense["id"] };
    }
  | {
      type: "update-expense";
      payload: { expense: Expense };
    }
  | {
      type: "place-budget";
    };

export type BudgetState = {
  budget: number;
  modal: boolean;
  expenses: Expense[];
  editingID: Expense["id"];
};

const localStorageBudget = (): number => {
  const localBudget = localStorage.getItem("budget");
  return localBudget ? parseInt(localBudget) : 0;
};

const localStorageExpenses = (): Expense[] => {
  const localExpenses = localStorage.getItem("expenses");
  return localExpenses ? JSON.parse(localExpenses) : [];
};

export const initialState: BudgetState = {
  budget: localStorageBudget(),
  modal: false,
  expenses: localStorageExpenses(),
  editingID: "",
};
// Crear un gasto con id unico usando uuid y recibe como parametro un gasto en borrador de tipo DraftExpense sin ID y el cual nos debera de retornar un gasto de tipo Expense con un id unico
const createExpense = (draftExpense: DraftExpense): Expense => {
  // const { expenseName, amount, category, date } = draftExpense;
  // return {
  //   id: uuidv4(),
  //   expenseName,
  //   amount,
  //   category,
  //   date,
  // };
  return {
    id: uuidv4(),
    ...draftExpense,
  };
};

export const budgetReducer = (
  state: BudgetState = initialState,
  action: BudgetAction,
) => {
  if (action.type === "add-budget") {
    return {
      ...state,
      budget: action.payload.budget,
    };
  }
  if (action.type === "show-modal") {
    return {
      ...state,
      modal: true,
    };
  }
  if (action.type === "close-modal") {
    return {
      ...state,
      modal: false,
      editingID: "",
    };
  }
  if (action.type === "add-expense") {
    const expense = createExpense(action.payload.expense);
    return {
      ...state,
      expenses: [...state.expenses, expense],
      modal: false,
    };
  }
  if (action.type === "remove-expense") {
    return {
      ...state,
      expenses: state.expenses.filter(
        (expense) => expense.id !== action.payload.id,
      ),
    };
  }
  if (action.type === "get-expense-by-id") {
    return {
      ...state,
      editingID: action.payload.id,
      modal: true,
    };
  }
  if (action.type === "update-expense") {
    return {
      ...state,
      expenses: state.expenses.map((expense) =>
        expense.id === action.payload.expense.id
          ? action.payload.expense
          : expense,
      ),
      modal: false,
      editingID: "",
    };
  }
  if (action.type === "place-budget") {
    return {
      ...state,
      budget: 0,
      expenses: [],
    };
  }
  return state;
};
